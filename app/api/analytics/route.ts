import { AnalyticsService } from "@/lib/api/analytics"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event, properties } = body

    if (!event) {
      return new NextResponse("Event is required", { status: 400 })
    }

    await AnalyticsService.track(event, properties)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[ANALYTICS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
