import { NextRequest } from "next/server"

import { getProduct } from "@/features/products/dal/queries"
import { ApiResponse } from "@/lib/api-response"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id
    const product = await getProduct(id)
    return ApiResponse.success(product)
  } catch {
    return ApiResponse.error({
      message: "Failed to get product",
      status: 404,
    })
  }
}
