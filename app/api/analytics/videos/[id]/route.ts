import { type NextRequest, NextResponse } from "next/server"
import { AnalyticsService } from "@/lib/api/analytics"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const period = (searchParams.get("period") as "day" | "week" | "month") || "week"

    const analytics = await AnalyticsService.getVideoAnalytics(params.id, period)
    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching video analytics:", error)
    return NextResponse.json({ error: "Failed to fetch video analytics" }, { status: 500 })
  }
}
