import { CategoryService } from "../services/category-service"

export async function getCategory(id: string) {
  const categoryService = new CategoryService()
  return categoryService.getCategory(id)
}
