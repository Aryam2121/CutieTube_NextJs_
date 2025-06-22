import { NextResponse } from "next/server"

import { auth } from "@clerk/nextjs"
import { prismadb } from "@/lib/db"
import { UserService } from "@/lib/api/users"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const user = await UserService.getUserById(params.id)

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const subscription = await prismadb.subscription.create({
      data: {
        userId: params.id,
      },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    console.log("[SUBSCRIPTION_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
