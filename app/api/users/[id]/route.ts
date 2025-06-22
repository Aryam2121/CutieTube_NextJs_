import { NextResponse } from "next/server"
import { UserService } from "@/lib/api/users"

type Params = {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id
    const user = await UserService.getUser(id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ message: "Error fetching user", error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const id = params.id
    const body = await request.json()

    const updatedUser = await UserService.updateUser(id, body)

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error("Error updating user:", error)
    return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id
    const deletedUser = await UserService.deleteUser(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "Error deleting user", error: error.message }, { status: 500 })
  }
}
