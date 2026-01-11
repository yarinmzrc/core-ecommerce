import { getMostPopularProducts } from "@/features/products/dal/queries"
import { ApiResponse } from "@/lib/api-response"

export async function GET() {
  try {
    const products = await getMostPopularProducts()
    return ApiResponse.success(products)
  } catch {
    return ApiResponse.error({
      message: "Failed to get most popular products",
      status: 404,
    })
  }
}
