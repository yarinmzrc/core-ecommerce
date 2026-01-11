import { ApiResponse } from "@/lib/api-response"
import { clearAccessTokenCookie } from "@/lib/auth/cookies"

export async function POST() {
  const response = ApiResponse.success({ success: true })
  clearAccessTokenCookie(response)
  return response
}
