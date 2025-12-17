import { Prisma } from "../../../prisma/generated/prisma/client"

export type Product = {
  id: string
  name: string
  price: number
  description: string
  imagePath: string
  imagePublicId: string
  isAvailableForSale: boolean
  createdAt: Date
  updatedAt: Date
}

export type WithCategory = {
  category: {
    id: string
    name: string
  }
}

export type WithOrderCount = {
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
