import { type NextRequest, NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const sortBy = searchParams.get("sortBy") || "relevance"
    const uploadDate = searchParams.get("uploadDate")
    const duration = searchParams.get("duration")
    const type = searchParams.get("type")

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const offset = (page - 1) * limit;
    const results = await VideoService.searchVideos(
      query,
      {
        limit,
        offset,
        // category: you can map type or another param to category if needed
      }
    )

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching videos:", error)
    return NextResponse.json({ error: "Failed to search videos" }, { status: 500 })
  }
}
