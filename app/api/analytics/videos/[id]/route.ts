import { type NextRequest, NextResponse } from "next/server"
import { AnalyticsService } from "@/lib/api/analytics"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // You can choose the period based on your logic, here using "week" as default
    const analytics = await AnalyticsService.getVideoAnalytics(
      params.id,
      "week"
    )

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching video analytics:", error)
    return NextResponse.json({ error: "Failed to fetch video analytics" }, { status: 500 })
  }
}
