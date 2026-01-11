import { getCategories } from "@/features/categories/dal/queries"
import { ApiResponse } from "@/lib/api-response"

export async function GET() {
  try {
    const categories = await getCategories()
    return ApiResponse.success(categories)
  } catch (error) {
    return ApiResponse.error("Failed to get categories")
  }
}
