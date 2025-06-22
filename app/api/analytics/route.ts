import { type NextRequest, NextResponse } from "next/server"
import { AnalyticsService } from "@/lib/api/analytics"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // You can adjust the period as needed: "day", "week", or "month"
    const analytics = await AnalyticsService.getChannelAnalytics(userId)

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
