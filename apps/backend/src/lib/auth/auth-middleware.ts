import { NextRequest, NextResponse } from "next/server"

import { RoleDTO } from "@/features/users/dtos"

import { getAccessTokenCookie } from "./cookies"
import { verifyAccessToken } from "./jwt"

export function withRequireAdmin(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>,
) {
  return async (req: NextRequest, context: any) => {
    const token = getAccessTokenCookie(req)

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
      const user = verifyAccessToken(token)

      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      if (
        [RoleDTO.SUPER_ADMIN, RoleDTO.STORE_ADMIN].includes(user.role) === false
      ) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      return handler(req, context)
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      )
    }
  }
}
