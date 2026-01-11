import { NextRequest } from "next/server"

import { getCategory } from "@/features/categories/dal/queries"
import { ApiResponse } from "@/lib/api-response"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id
    const category = await getCategory(id)
    return ApiResponse.success(category)
  } catch {
    return ApiResponse.error({
      message: "Failed to get category",
      status: 404,
    })
  }
}
