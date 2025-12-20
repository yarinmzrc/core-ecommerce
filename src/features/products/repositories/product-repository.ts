import { prisma } from "../../../../prisma/client"
import { CreateProductInput } from "../types"

export class ProductRepository {
  async create(data: CreateProductInput) {
    return prisma.product.create({
      data,
    })
  }

  async update(id: string, data: CreateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } })
  }

  async getProduct(id: string) {
    return prisma.product.findUnique({ where: { id } })
  }

  async getProductsByIds(ids: string[]) {
    return prisma.product.findMany({ where: { id: { in: ids } } })
  }

  async getMostPopularProducts() {
    return prisma.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { orderItems: { _count: "desc" } },
      take: 6,
    })
  }

  async getNewestProducts() {
    return prisma.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    })
  }

  async getProductsForStore() {
    return prisma.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { name: "asc" },
    })
  }

  async getProductsForAdmin() {
    return prisma.product.findMany({
      include: {
        category: true,
        _count: {
          select: { orderItems: true },
        },
      },
    })
  }

  async toggleProductAvailability(id: string, isAvailableForSale: boolean) {
    return prisma.product.update({
      where: { id },
      data: { isAvailableForSale },
    })
  }
}
