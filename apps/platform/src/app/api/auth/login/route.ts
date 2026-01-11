import bcrypt from "bcrypt"

import { ApiResponse } from "@/lib/api-response"
import { setAccessTokenCookie } from "@/lib/auth/cookies"
import { signAccessToken } from "@/lib/auth/jwt"
import db from "@/lib/db"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    return ApiResponse.error({ message: "Invalid Credentials", status: 401 })
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)

  if (!isValid) {
    return ApiResponse.error({ message: "Invalid Credentials", status: 401 })
  }

  const token = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  })

  const response = ApiResponse.success({ success: true })

  setAccessTokenCookie(response, token)

  return response
}
