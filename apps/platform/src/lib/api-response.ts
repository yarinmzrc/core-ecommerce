import { NextResponse } from "next/server"

export const ApiResponse = {
  success: <T>(data?: T) => NextResponse.json({ success: true, data }),
  error: ({ message, status }: { message: string; status?: number }) =>
    NextResponse.json({
      success: false,
      error: message,
      status: status ?? undefined,
    }),
}
