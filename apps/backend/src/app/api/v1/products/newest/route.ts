import { getNewestProducts } from "@/features/products/dal/queries"
import { ApiResponse } from "@/lib/api-response"

export async function GET() {
  try {
    const products = await getNewestProducts()
    return ApiResponse.success(products)
  } catch (error) {
    return ApiResponse.error("Failed to get newest products")
  }
}
