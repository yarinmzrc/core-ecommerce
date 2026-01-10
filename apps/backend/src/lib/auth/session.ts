import { cookies } from "next/headers"

import { ACCESS_COOKIE_NAME } from "./cookies"
import { verifyAccessToken } from "./jwt"

export async function getCurrentUser() {
  const token = (await cookies()).get(ACCESS_COOKIE_NAME)?.value

  if (!token) {
    return null
  }

  try {
    return verifyAccessToken(token)
  } catch {
    return null
  }
}
