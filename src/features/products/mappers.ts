import { Product as PrismaProduct } from "../../../prisma/generated/prisma/client"
import {
  PrismaProductWithCategory,
  PrismaProductWithOrderCount,
  Product,
  WithCategory,
  WithOrderCount,
} from "./types"

export function mapBaseProduct(prisma: PrismaProduct): Product {
  return {
    id: prisma.id,
    name: prisma.name,
    price: prisma.price,
    description: prisma.description,
    imagePath: prisma.imagePath,
    imagePublicId: prisma.imagePublicId,
    isAvailableForSale: prisma.isAvailableForSale,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  }
}

export function mapProductWithCategory(
  prisma: PrismaProductWithCategory,
): Product & WithCategory {
  return {
    ...mapBaseProduct(prisma),
    category: {
      id: prisma.category.id,
      name: prisma.category.name,
    },
  }
}

export function mapProductWithCategoryAndOrderCount(
  prisma: PrismaProductWithCategory & PrismaProductWithOrderCount,
): Product & WithCategory & WithOrderCount {
  return {
    ...mapProductWithCategory(prisma),
    orderCount: prisma._count.orderItems,
  }
}
