import { NextResponse } from "next/server"

export const ApiResponse = {
  success: <T>(data?: T) => NextResponse.json({ success: true, data }),
  error: (message: string) =>
    NextResponse.json({ success: false, error: message }),
}
