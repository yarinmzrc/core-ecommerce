import { prisma } from "../../../../prisma/client"

export class CategoryRepository {
  async getCategory(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true },
    })
  }

  async getCategories() {
    return prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
  }

  async createCategory(name: string) {
    return prisma.category.create({
      data: {
        name,
      },
    })
  }
}
