import { Product as PrismaProduct } from "../../../prisma/generated/prisma/client"
import {
  PrismaProductWithCategory,
  PrismaProductWithOrderCount,
  ProductDTO,
  ProductListItemDTO,
} from "./dtos"

export function mapBaseProduct(prisma: PrismaProduct): ProductDTO {
  return {
    id: prisma.id,
    name: prisma.name,
    slug: prisma.slug,
    basePrice: prisma.basePrice,
    description: prisma.description,
    variants: [],
    options: [],
    categoryId: prisma.categoryId,
    images: prisma.images,
    isAvailableForSale: prisma.isAvailableForSale,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  }
}

export function mapProductListItem(
  prisma: PrismaProductWithCategory & PrismaProductWithOrderCount,
): ProductListItemDTO {
  return {
    ...mapBaseProduct(prisma),
    orderCount: prisma._count.orderItems,
    categoryName: prisma.category.name,
  }
}
