import { type NextRequest, NextResponse } from "next/server"
import { razorpay } from "@/lib/razorpay"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", receipt, notes } = await request.json()

    // Get user from session
    const supabase = supabaseServer
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `order_${Date.now()}`,
      notes: {
        userId: user.id,
        ...notes,
      },
    })

    // Store order in database
    const { error: dbError } = await supabase.from("payment_orders").insert({
      id: order.id,
      user_id: user.id,
      amount: amount,
      currency,
      status: "created",
      receipt: order.receipt,
      notes,
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to store order" }, { status: 500 })
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("Payment order creation error:", error)
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
