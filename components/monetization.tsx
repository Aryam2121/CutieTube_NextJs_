"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Crown, Gift, TrendingUp, Users, Star, Heart, CreditCard, IndianRupee } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { toast } from "sonner"
import { getRazorpayOptions } from "@/lib/razorpay"

interface Subscription {
  id: string
  tier_name: string
  price: number
  benefits: string[]
  subscriber_count: number
  color: string
}

interface Donation {
  id: string
  amount: number
  message: string
  donor_name: string
  created_at: string
}

const subscriptionTiers: Subscription[] = [
  {
    id: "1",
    tier_name: "Supporter",
    price: 199,
    benefits: ["Early access to videos", "Custom badge", "Priority comments"],
    subscriber_count: 45,
    color: "blue",
  },
  {
    id: "2",
    tier_name: "Super Fan",
    price: 499,
    benefits: ["All Supporter benefits", "Monthly live Q&A", "Discord access", "Behind-the-scenes content"],
    subscriber_count: 23,
    color: "purple",
  },
  {
    id: "3",
    tier_name: "VIP",
    price: 999,
    benefits: ["All previous benefits", "1-on-1 monthly call", "Exclusive merch", "Input on content ideas"],
    subscriber_count: 8,
    color: "gold",
  },
]

export function Monetization() {
  const { user } = useAuth()
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const [totalSubscribers, setTotalSubscribers] = useState(0)
  const [adsEnabled, setAdsEnabled] = useState(true)
  const [sponsorshipsEnabled, setSponsorshipsEnabled] = useState(false)
  const [merchandiseEnabled, setMerchandiseEnabled] = useState(false)
  const [showCreateTierDialog, setShowCreateTierDialog] = useState(false)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const [donations, setDonations] = useState<Donation[]>([])
  const [userSubscriptions, setUserSubscriptions] = useState<any[]>([])
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  useEffect(() => {
    fetchDonations()
    fetchUserSubscriptions()

    // Calculate totals
    const subsRevenue = subscriptionTiers.reduce((sum, tier) => sum + tier.price * tier.subscriber_count, 0)
    const donationsRevenue = donations.reduce((sum, donation) => sum + donation.amount, 0)
    const totalSubs = subscriptionTiers.reduce((sum, tier) => sum + tier.subscriber_count, 0)

    setTotalRevenue(subsRevenue + donationsRevenue)
    setMonthlyRevenue(subsRevenue)
    setTotalSubscribers(totalSubs)
  }, [donations])

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/donations")
      if (response.ok) {
        const data = await response.json()
        setDonations(data.donations || [])
      }
    } catch (error) {
      console.error("Failed to fetch donations:", error)
    }
  }

  const fetchUserSubscriptions = async () => {
    try {
      const response = await fetch("/api/subscriptions")
      if (response.ok) {
        const data = await response.json()
        setUserSubscriptions(data.subscriptions || [])
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error)
    }
  }

  const handleSubscription = async (tierId: string) => {
    if (!user) {
      toast.error("Please login to subscribe")
      return
    }

    setIsProcessingPayment(true)

    try {
      // Get subscription tier details
      const tierResponse = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId }),
      })

      if (!tierResponse.ok) {
        throw new Error("Failed to get subscription details")
      }

      const { tier } = await tierResponse.json()

      // Create payment order
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: tier.price,
          currency: "INR",
          receipt: `subscription_${tierId}_${Date.now()}`,
          notes: {
            type: "subscription",
            tierId: tierId,
            tierName: tier.name,
          },
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order")
      }

      const { orderId } = await orderResponse.json()

      // Initialize Razorpay
      const options = getRazorpayOptions(
        orderId,
        tier.price,
        "INR",
        user.user_metadata?.full_name || user.email || "User",
        `Subscription to ${tier.name}`,
        user.email || "",
        user.user_metadata?.full_name || "User",
        async (response: any) => {
          // Payment success
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                subscriptionTierId: tierId,
              }),
            })

            if (verifyResponse.ok) {
              toast.success("Subscription activated successfully!")
              fetchUserSubscriptions()
            } else {
              toast.error("Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast.error("Payment verification failed")
          } finally {
            setIsProcessingPayment(false)
          }
        },
        (error: any) => {
          // Payment failure
          console.error("Payment failed:", error)
          toast.error("Payment failed or cancelled")
          setIsProcessingPayment(false)
        },
      )

      // Load Razorpay script and open payment modal
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error("Subscription error:", error)
      toast.error("Failed to process subscription")
      setIsProcessingPayment(false)
    }
  }

  const handleDonation = async (amount: number, message: string, donorName: string) => {
    if (!user) {
      toast.error("Please login to donate")
      return
    }

    setIsProcessingPayment(true)

    try {
      // Create payment order
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `donation_${Date.now()}`,
          notes: {
            type: "donation",
            message,
            donorName,
          },
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order")
      }

      const { orderId } = await orderResponse.json()

      // Initialize Razorpay
      const options = getRazorpayOptions(
        orderId,
        amount,
        "INR",
        donorName || user.user_metadata?.full_name || user.email || "Anonymous",
        `Donation: ${message}`,
        user.email || "",
        donorName || user.user_metadata?.full_name || "Anonymous",
        async (response: any) => {
          // Payment success
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                donationData: {
                  amount,
                  message,
                  donorName: donorName || "Anonymous",
                },
              }),
            })

            if (verifyResponse.ok) {
              toast.success("Thank you for your donation!")
              fetchDonations()
              setShowDonationDialog(false)
            } else {
              toast.error("Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast.error("Payment verification failed")
          } finally {
            setIsProcessingPayment(false)
          }
        },
        (error: any) => {
          // Payment failure
          console.error("Payment failed:", error)
          toast.error("Payment failed or cancelled")
          setIsProcessingPayment(false)
        },
      )

      // Load Razorpay script and open payment modal
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error("Donation error:", error)
      toast.error("Failed to process donation")
      setIsProcessingPayment(false)
    }
  }

  const createSubscriptionTier = async (formData: FormData) => {
    const tierName = formData.get("tierName") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const benefits = (formData.get("benefits") as string).split("\n").filter((b) => b.trim())

    // In a real app, you'd save this to the database
    toast.success("Subscription tier created!")
    setShowCreateTierDialog(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Monetization</h1>
          <p className="text-muted-foreground">Manage your revenue streams and subscriptions</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Crown className="h-3 w-3" />
          Creator Partner
        </Badge>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">Recurring subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscribers}</div>
            <p className="text-xs text-muted-foreground">Paid subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">Viewers to subscribers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="ads">Advertising</TabsTrigger>
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Subscription Tiers</h3>
            <Dialog open={showCreateTierDialog} onOpenChange={setShowCreateTierDialog}>
              <DialogTrigger asChild>
                <Button>Create New Tier</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Subscription Tier</DialogTitle>
                  <DialogDescription>Set up a new subscription tier for your supporters</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    createSubscriptionTier(formData)
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="tierName">Tier Name</Label>
                    <Input id="tierName" name="tierName" placeholder="e.g. Super Fan" required />
                  </div>
                  <div>
                    <Label htmlFor="price">Monthly Price (₹)</Label>
                    <Input id="price" name="price" type="number" step="1" placeholder="499" required />
                  </div>
                  <div>
                    <Label htmlFor="benefits">Benefits (one per line)</Label>
                    <Textarea
                      id="benefits"
                      name="benefits"
                      placeholder="Early access to videos&#10;Custom badge&#10;Priority comments"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Tier
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionTiers.map((tier) => (
              <Card key={tier.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {tier.tier_name}
                        <Crown className={`h-4 w-4 text-${tier.color}-500`} />
                      </CardTitle>
                      <CardDescription>{formatCurrency(tier.price)}/month</CardDescription>
                    </div>
                    <Badge variant="secondary">{tier.subscriber_count} subs</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-muted-foreground mb-4">
                    Monthly Revenue: {formatCurrency(tier.price * tier.subscriber_count)}
                  </div>
                  <Button onClick={() => handleSubscription(tier.id)} disabled={isProcessingPayment} className="w-full">
                    {isProcessingPayment ? "Processing..." : "Subscribe"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Donations</h3>
            <Dialog open={showDonationDialog} onOpenChange={setShowDonationDialog}>
              <DialogTrigger asChild>
                <Button>Make Donation</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make a Donation</DialogTitle>
                  <DialogDescription>Support this creator with a donation</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const amount = Number.parseFloat(formData.get("amount") as string)
                    const message = formData.get("message") as string
                    const donorName = formData.get("donorName") as string
                    handleDonation(amount, message, donorName)
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input id="amount" name="amount" type="number" step="1" min="1" placeholder="100" required />
                  </div>
                  <div>
                    <Label htmlFor="donorName">Your Name (optional)</Label>
                    <Input id="donorName" name="donorName" placeholder="Anonymous" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message (optional)</Label>
                    <Textarea id="message" name="message" placeholder="Leave a message for the creator..." rows={3} />
                  </div>
                  <Button type="submit" className="w-full" disabled={isProcessingPayment}>
                    {isProcessingPayment ? "Processing..." : "Donate"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Donation Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Donations</span>
                  <span className="font-bold">{formatCurrency(donations.reduce((sum, d) => sum + d.amount, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Donation</span>
                  <span className="font-bold">
                    {formatCurrency(
                      donations.length > 0 ? donations.reduce((sum, d) => sum + d.amount, 0) / donations.length : 0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Donors</span>
                  <span className="font-bold">{donations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(donations.reduce((sum, d) => sum + d.amount, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {donations.length > 0 ? (
                    donations.slice(0, 5).map((donation) => (
                      <div key={donation.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{donation.donor_name}</span>
                            <span className="font-bold text-green-600">{formatCurrency(donation.amount)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{donation.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(donation.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No donations yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advertising Revenue</CardTitle>
              <CardDescription>Manage your ad placements and earnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ads-enabled">Enable Ads</Label>
                  <p className="text-sm text-muted-foreground">Show ads on your videos to earn revenue</p>
                </div>
                <Switch checked={adsEnabled} onCheckedChange={setAdsEnabled} />
              </div>

              {adsEnabled && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Ad Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{formatCurrency(24311)}</div>
                      <div className="text-sm text-muted-foreground">This Month</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">₹1.20</div>
                      <div className="text-sm text-muted-foreground">RPM (Revenue per Mille)</div>
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Video Types</SelectItem>
                      <SelectItem value="preroll">Pre-roll Ads</SelectItem>
                      <SelectItem value="midroll">Mid-roll Ads</SelectItem>
                      <SelectItem value="postroll">Post-roll Ads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchandise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Merchandise Store</CardTitle>
              <CardDescription>Sell branded merchandise to your fans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="merch-enabled">Enable Merchandise</Label>
                  <p className="text-sm text-muted-foreground">Integrate with merchandise partners</p>
                </div>
                <Switch checked={merchandiseEnabled} onCheckedChange={setMerchandiseEnabled} />
              </div>

              {merchandiseEnabled && (
                <div className="space-y-4">
                  <Button>Connect to Store</Button>
                  <p className="text-sm text-muted-foreground">
                    Connect your merchandise store to start selling products directly from your channel
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monetization Settings</CardTitle>
              <CardDescription>Configure your revenue preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sponsorships">Brand Sponsorships</Label>
                  <p className="text-sm text-muted-foreground">Allow brands to sponsor your content</p>
                </div>
                <Switch checked={sponsorshipsEnabled} onCheckedChange={setSponsorshipsEnabled} />
              </div>

              <div className="space-y-2">
                <Label>Payout Method</Label>
                <Select defaultValue="razorpay">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="razorpay">Razorpay</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" placeholder="For tax reporting purposes" />
              </div>

              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
