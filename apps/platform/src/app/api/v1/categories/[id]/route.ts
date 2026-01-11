import { NextRequest } from "next/server"

import { ApiResponse } from "@/lib/api-response"
import { getCategory } from "@/features/categories/dal/queries"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id
    const category = await getCategory(id)
    return ApiResponse.success(category)
  } catch (error) {
    return ApiResponse.error("Failed to get product")
  }
}
