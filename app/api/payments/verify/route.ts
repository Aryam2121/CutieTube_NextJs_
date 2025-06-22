import { type NextRequest, NextResponse } from "next/server"
import { verifyPaymentSignature } from "@/lib/razorpay"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, subscriptionTierId, donationData } = await request.json()

    // Verify payment signature
    const isValid = verifyPaymentSignature(orderId, paymentId, signature)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    const supabase = supabaseServer
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update payment order status
    const { error: updateError } = await supabase
      .from("payment_orders")
      .update({
        status: "completed",
        payment_id: paymentId,
        signature,
        completed_at: new Date().toISOString(),
      })
      .eq("id", orderId)

    if (updateError) {
      console.error("Failed to update payment order:", updateError)
    }

    // Handle subscription payment
    if (subscriptionTierId) {
      const { error: subError } = await supabase.from("subscriptions").upsert({
        user_id: user.id,
        tier_id: subscriptionTierId,
        status: "active",
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        payment_id: paymentId,
      })

      if (subError) {
        console.error("Failed to create subscription:", subError)
        return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
      }
    }

    // Handle donation payment
    if (donationData) {
      const { error: donationError } = await supabase.from("donations").insert({
        user_id: user.id,
        amount: donationData.amount,
        message: donationData.message,
        donor_name: donationData.donorName,
        payment_id: paymentId,
        status: "completed",
      })

      if (donationError) {
        console.error("Failed to record donation:", donationError)
        return NextResponse.json({ error: "Failed to record donation" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, paymentId })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
