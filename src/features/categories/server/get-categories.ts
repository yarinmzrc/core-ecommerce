import { CategoryService } from "../services/category-service"

export const getCategories = async () => {
  const categoryService = new CategoryService()
  return categoryService.getCategories()
}
