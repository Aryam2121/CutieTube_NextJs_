"use client"

import { useState } from "react"
import { toast } from "sonner"
import { getRazorpayOptions } from "@/lib/razorpay"
import { useAuth } from "@/components/auth-provider"

export function usePayments() {
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)

  const processPayment = async (
    amount: number,
    description: string,
    type: "subscription" | "donation",
    metadata: any = {},
  ) => {
    if (!user) {
      toast.error("Please login to continue")
      return false
    }

    setIsProcessing(true)

    try {
      // Create payment order
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `${type}_${Date.now()}`,
          notes: {
            type,
            ...metadata,
          },
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order")
      }

      const { orderId } = await orderResponse.json()

      return new Promise((resolve) => {
        const options = getRazorpayOptions(
          {
            orderId,
            amount,
            currency: "INR",
            name: user.user_metadata?.full_name || user.email || "User",
            description,
            email: user.email || "",
            handler: async (response: any) => {
              // Payment success
              try {
                const verifyResponse = await fetch("/api/payments/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                    ...metadata,
                  }),
                })

                if (verifyResponse.ok) {
                  toast.success("Payment successful!")
                  resolve(true)
                } else {
                  toast.error("Payment verification failed")
                  resolve(false)
                }
              } catch (error) {
                console.error("Payment verification error:", error)
                toast.error("Payment verification failed")
                resolve(false)
              } finally {
                setIsProcessing(false)
              }
            },
            modal: {
              ondismiss: (error: any) => {
                // Payment failure or cancelled
                console.error("Payment failed:", error)
                toast.error("Payment failed or cancelled")
                setIsProcessing(false)
                resolve(false)
              }
            }
          },
          amount
        )

        // Load Razorpay script and open payment modal
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options)
          rzp.open()
        }
        document.body.appendChild(script)
      })
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Failed to process payment")
      setIsProcessing(false)
      return false
    }
  }

  return {
    processPayment,
    isProcessing,
  }
}
