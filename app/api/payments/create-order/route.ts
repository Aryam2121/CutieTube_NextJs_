import Razorpay from "razorpay"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: user, error: userError } = await supabase.auth.getUser()

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    const { amount } = await request.json()

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const options = {
      amount: amount * 100,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Store order details in Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user.user.id,
          order_id: order.id,
          amount: amount,
          currency: order.currency,
          receipt: order.receipt,
          status: order.status,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to store order details" }, { status: 500 })
    }

    return NextResponse.json({ order }, { status: 200 })

  } catch (error: any) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
