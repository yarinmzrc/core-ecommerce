import { CategoryRepository } from "../repositories/category-repository"

export class CategoryService {
  constructor(private readonly categoryRepository = new CategoryRepository()) {}
  async getCategory(id: string) {
    return this.categoryRepository.getCategory(id)
  }
  async getCategories() {
    return this.categoryRepository.getCategories()
  }
  async createCategory(name: string) {
    return this.categoryRepository.createCategory(name)
  }
}
