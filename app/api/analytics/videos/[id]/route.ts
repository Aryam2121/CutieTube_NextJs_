import { type NextRequest, NextResponse } from "next/server"
import { AnalyticsService } from "@/lib/api/analytics"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = (searchParams.get("period") as "day" | "week" | "month") || "week"

    // Extract the video ID from the URL
    const pathSegments = request.nextUrl.pathname.split("/")
    const id = pathSegments[pathSegments.length - 1] // or use `.at(-1)`

    if (!id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
    }

    const analytics = await AnalyticsService.getVideoAnalytics(id, period)
    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching video analytics:", error)
    return NextResponse.json({ error: "Failed to fetch video analytics" }, { status: 500 })
  }
}
