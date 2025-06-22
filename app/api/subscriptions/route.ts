import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseServer
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's active subscriptions
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select(`
        *,
        subscription_tiers (
          id,
          name,
          price,
          benefits,
          color
        )
      `)
      .eq("user_id", user.id)
      .eq("status", "active")

    if (error) {
      console.error("Failed to fetch subscriptions:", error)
      return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
    }

    return NextResponse.json({ subscriptions })
  } catch (error) {
    console.error("Subscriptions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tierId } = await request.json()

    const supabase = supabaseServer
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get subscription tier details
    const { data: tier, error: tierError } = await supabase
      .from("subscription_tiers")
      .select("*")
      .eq("id", tierId)
      .single()

    if (tierError || !tier) {
      return NextResponse.json({ error: "Subscription tier not found" }, { status: 404 })
    }

    return NextResponse.json({ tier })
  } catch (error) {
    console.error("Subscription creation error:", error)
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 })
  }
}
