import { env } from "@ecommerce/config"
import { NextRequest, NextResponse } from "next/server"

export const ACCESS_COOKIE_NAME = "access_token"

export function setAccessTokenCookie(response: NextResponse, token: string) {
  response.cookies.set(ACCESS_COOKIE_NAME, token, {
    httpOnly: true,
    secure: !env.NEXT_PUBLIC_SERVER_URL.includes("localhost"),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  })
}

export function clearAccessTokenCookie(response: NextResponse) {
  response.cookies.delete(ACCESS_COOKIE_NAME)
}

export function getAccessTokenCookie(request: NextRequest) {
  return request.cookies.get(ACCESS_COOKIE_NAME)?.value
}
