import { Prisma } from "../../../prisma/generated/prisma/client"

export type ImageDTO = {
  url: string
  publicId: string
}

export type ProductOptionValueDTO = {
  name: string
  extraPrice: number
}

export type ProductOptionDTO = {
  name: string
  values: ProductOptionValueDTO[]
}

export type ProductVariantDTO = {
  sku: string | null
  price: number
  stockQuantity: number
  images: ImageDTO[]
  selectedOptions: Record<string, string> | null
}
export type ProductDTO = {
  id: string
  name: string
  slug: string
  basePrice: number
  description: string
  images: ImageDTO[]
  isAvailableForSale: boolean
  categoryId: string
  attributes: Record<string, string> | null

  createdAt: Date
  updatedAt: Date
}

export type ProductListItemDTO = ProductDTO & {
  categoryName: string
  orderCount: number
}

export type PrismaProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: true
  }
}>

export type PrismaProductWithOrderCount = Prisma.ProductGetPayload<{
  include: {
    _count: {
      select: {
        orderItems: true
      }
    }
  }
}>

export type CreateProductInput = Omit<
  ProductDTO,
  "id" | "createdAt" | "updatedAt" | "isAvailableForSale"
> & {
  categoryId: string
}
