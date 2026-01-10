import { NextResponse } from "next/server"

import { getProductsForStore } from "@/features/products/dal/queries"
import { ApiResponse } from "@/lib/api-response"

export async function GET() {
  try {
    const products = await getProductsForStore()
    return ApiResponse.success(products)
  } catch (error) {
    return ApiResponse.error("Failed to get products")
  }
}
