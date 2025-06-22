import { NextResponse, type NextRequest } from "next/server"
import { AnalyticsService } from "@/lib/api/analytics"

export async function POST(req: NextRequest) {
  try {
    // Extract video ID from the dynamic route
    const id = req.nextUrl.pathname.split("/").pop()

    if (!id) {
      return new NextResponse("Video ID is required", { status: 400 })
    }

    await AnalyticsService.recordVideoView(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[VIDEO_ANALYTICS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop()

    if (!id) {
      return new NextResponse("Video ID is required", { status: 400 })
    }

    const views = await AnalyticsService.getVideoViews(id)

    return NextResponse.json({ views })
  } catch (error) {
    console.error("[VIDEO_ANALYTICS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
