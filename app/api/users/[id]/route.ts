import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/api/users"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const user = await UserService.getUserById(params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const body = await request.json()
    const user = await UserService.updateUser(params.id, body)
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
