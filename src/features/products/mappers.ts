import {
  Product as PrismaProduct,
  ProductOption as PrismaProductOption,
  ProductVariant as PrismaProductVariant,
} from "../../../prisma/generated/prisma/client"
import {
  PrismaProductWithCategory,
  PrismaProductWithOrderCount,
  ProductDTO,
  ProductListItemDTO,
  ProductOptionDTO,
  ProductOptionOverridesDTO,
  ProductVariantDTO,
} from "./dtos"

export function mapProductOption(
  prisma: PrismaProductOption,
): ProductOptionDTO {
  return {
    id: prisma.id,
    name: prisma.name,
    templateId: prisma.templateId,
    overrides: (prisma.overrides as ProductOptionOverridesDTO) ?? {},
  }
}

export function mapProductVariant(
  prisma: PrismaProductVariant,
): ProductVariantDTO {
  return {
    sku: prisma.sku,
    price: prisma.price,
    stockQuantity: prisma.stockQuantity,
    images: prisma.images,
    selectedOptions: (prisma.selectedOptions as Record<string, string>) ?? {},
  }
}

export function mapBaseProduct(prisma: PrismaProduct): ProductDTO {
  return {
    id: prisma.id,
    name: prisma.name,
    slug: prisma.slug,
    basePrice: prisma.basePrice,
    description: prisma.description,
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
