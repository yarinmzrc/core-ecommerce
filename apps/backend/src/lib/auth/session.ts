import { ACCESS_COOKIE_NAME } from "./cookies"
import { verifyAccessToken } from "./jwt"
import { cookies } from "next/headers"
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
