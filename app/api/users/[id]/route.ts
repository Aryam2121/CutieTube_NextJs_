import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/api/users"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const profile = await UserService.getProfile(params.id)
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const profile = await UserService.updateProfile(params.id, body)
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
