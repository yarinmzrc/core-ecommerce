import { Prisma } from "../../../prisma/generated/prisma/client"
import {
  OptionInputType,
  OptionPricingStrategy,
  OptionUIType,
  OptionValueDTO,
} from "../option-templates/dtos"

export type ImageDTO = {
  url: string
  publicId: string
}

export type ProductOptionValueDTO = {
  name: string
  label: string
  extraPrice: number
}

export type ProductOptionOverridesDTO = {
  name: string
  inputType: OptionInputType
  uiType: OptionUIType
  pricingStrategy: OptionPricingStrategy
  values: OptionValueDTO[]
  isActive: boolean
  required: boolean
}

export type ProductOptionDTO = {
  id: string
  name: string
  templateId: string | null
  overrides: ProductOptionOverridesDTO | null
}

export type ProductOptionCreateDTO = Omit<ProductOptionDTO, "id">

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

  createdAt: Date
  updatedAt: Date
}

export type ProductListItemDTO = ProductDTO & {
  categoryName: string
  orderCount: number
}

export type ProductFullDTO = ProductDTO & {
  variants: ProductVariantDTO[]
  options: ProductOptionDTO[]
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
  options: ProductOptionCreateDTO[]
}
