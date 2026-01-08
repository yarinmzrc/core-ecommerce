import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import db from "@/lib/db"
import { signAccessToken } from "@/lib/auth/jwt"
import { setAccessTokenCookie } from "@/lib/auth/cookies"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 401 },
    )
  }

  const isValid = bcrypt.compare(password, user.passwordHash)

  if (!isValid) {
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 401 },
    )
  }

  const token = signAccessToken({
    sub: user.id,
    email: user.email,
  })

  const response = NextResponse.json({ success: true })

  setAccessTokenCookie(response, token)

  return response
}
