import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/api/users"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const subscriptions = await UserService.getSubscriptions(params.id)
    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { channelId } = await request.json()
    const subscription = await UserService.subscribe(params.id, channelId)
    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error("Error subscribing:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const channelId = searchParams.get("channelId")

    if (!channelId) {
      return NextResponse.json({ error: "Channel ID is required" }, { status: 400 })
    }

    await UserService.unsubscribe(params.id, channelId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error unsubscribing:", error)
    return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 })
  }
}
