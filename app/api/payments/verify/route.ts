import { createHmac } from "crypto"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SIGNING_SECRET
  const rawBody = await req.text()
  const hmac = createHmac("sha256", secret!)
  const digest = hmac.update(rawBody).digest("hex")
  const signature = req.headers.get("X-Signature")

  if (digest === signature) {
    console.log("Request is authentic")
    try {
      const data = JSON.parse(rawBody)
      const event_name = data.event
      if (event_name === "subscription_created") {
        const supabaseUrl = "https://aqknwwmazqssqiiygbjk.supabase.co"
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa253d21henFzc3FpaXlnYmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDA5NDcsImV4cCI6MjA2NTk3Njk0N30.zy41k261fQh6iRUUiLGRdk6VjLseFg9osR08PsLP3qs"
        const supabase = createClient(supabaseUrl, supabaseKey)
        const customer_id = data.data.attributes.customer_id
        const subscription_id = data.data.id
        const user_email = data.data.attributes.user_email

        const { data: profile } = await supabase.from("profiles").select("*").eq("email", user_email).single()

        if (profile) {
          await supabase
            .from("profiles")
            .update({
              lemon_customer_id: customer_id,
              lemon_subscription_id: subscription_id,
              subscription_status: "active",
            })
            .eq("id", profile.id)
        } else {
          console.error("No profile found with that email")
        }
      }

      if (event_name === "subscription_updated") {
        const supabaseUrl = "https://aqknwwmazqssqiiygbjk.supabase.co"
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa253d21henFzc3FpaXlnYmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDA5NDcsImV4cCI6MjA2NTk3Njk0N30.zy41k261fQh6iRUUiLGRdk6VjLseFg9osR08PsLP3qs"
        const supabase = createClient(supabaseUrl, supabaseKey)
        const subscription_status = data.data.attributes.status
        const subscription_id = data.data.id

        await supabase
          .from("profiles")
          .update({
            subscription_status: subscription_status,
          })
          .eq("lemon_subscription_id", subscription_id)
      }

      return new NextResponse(null, { status: 200 })
    } catch (error) {
      console.error("Error processing webhook:", error)
      return new NextResponse(null, { status: 500 })
    }
  } else {
    console.log("Request is not authentic")
    return new NextResponse(null, { status: 400 })
  }
}
