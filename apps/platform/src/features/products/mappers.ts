import {
  Product as PrismaProduct,
  ProductOption as PrismaProductOption,
  ProductVariant as PrismaProductVariant,
} from "../../../prisma/generated/prisma/client"
import type {
  Product,
  ProductSummary,
  ProductOption,
  OptionValue,
  ProductVariant,
} from "@repo/api-types"

export function mapProductOption(prisma: PrismaProductOption): ProductOption {
  return {
    id: prisma.id,
    name: prisma.name,
    inputType: prisma.inputType,
    uiType: prisma.uiType,
    pricingStrategy: prisma.pricingStrategy,
    values: prisma.values as OptionValue[],
    isActive: prisma.isActive,
    required: prisma.required,
    productId: prisma.productId,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  }
}

export function mapProductVariant(
  prisma: PrismaProductVariant,
): ProductVariant {
  return {
    id: prisma.id,
    productId: prisma.productId,
    sku: prisma.sku,
    price: prisma.price,
    stockQuantity: prisma.stockQuantity,
    images: prisma.images,
    selectedOptions: (prisma.selectedOptions as Record<string, string>) ?? {},
  }
}

export function mapProduct(
  prisma: PrismaProduct & {
    options: PrismaProductOption[]
    variants: PrismaProductVariant[]
  },
): Product {
  return {
    id: prisma.id,
    name: prisma.name,
    slug: prisma.slug,
    basePrice: prisma.basePrice,
    description: prisma.description,
    categoryId: prisma.categoryId,
    images: prisma.images,
    isAvailableForSale: prisma.isAvailableForSale,
    options: prisma.options.map(mapProductOption),
    variants: prisma.variants.map(mapProductVariant),
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  }
}

export function mapProductSummary(prisma: PrismaProduct): ProductSummary {
  return {
    id: prisma.id,
    name: prisma.name,
    slug: prisma.slug,
    basePrice: prisma.basePrice,
    description: prisma.description,
    images: prisma.images,
    isAvailableForSale: prisma.isAvailableForSale,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
    categoryId: prisma.categoryId,
  }
}
