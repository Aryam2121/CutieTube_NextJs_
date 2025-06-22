import { type NextRequest, NextResponse } from "next/server"
import { AnalyticsService } from "@/lib/api/analytics"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await AnalyticsService.trackEvent(body)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking event:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
