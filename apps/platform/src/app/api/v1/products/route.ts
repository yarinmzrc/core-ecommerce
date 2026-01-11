import { getProductsForStore } from "@/features/products/dal/queries"
import { ApiResponse } from "@/lib/api-response"

export async function GET() {
  try {
    const products = await getProductsForStore()
    return ApiResponse.success(products)
  } catch {
    return ApiResponse.error({
      message: "Failed to get products",
      status: 404,
    })
  }
}
