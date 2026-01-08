import { NextRequest, NextResponse } from "next/server"
import { getAccessTokenCookie } from "./cookies"
import { verifyAccessToken } from "./jwt"

export function withAuth(
  handler: (req: NextRequest, user: any) => Promise<Response>,
) {
  return async (req: NextRequest) => {
    const token = getAccessTokenCookie(req)

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
      const user = verifyAccessToken(token)
      return handler(req, user)
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      )
    }
  }
}
