import db from "@/lib/db"

import { mapProduct, mapProductSummary } from "../mappers"

export const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id },
    include: { variants: true, options: true },
  })
  if (!product) return null

  return mapProduct(product)
}

export const getProductsByIds = async (ids: string[]) => {
  return db.product.findMany({
    where: { id: { in: ids } },
    include: { variants: true },
  })
}

export const getMostPopularProducts = async () => {
  const products = await db.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { orderItems: { _count: "desc" } },
    take: 6,
  })

  return products.map(mapProductSummary)
}

export const getNewestProducts = async () => {
  const products = await db.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })

  return products.map(mapProductSummary)
}

export const getProductsForStore = () => {
  return db.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { name: "asc" },
  })
}

export async function getProductsForAdmin() {
  const products = await db.product.findMany({
    include: {
      category: true,
      _count: {
        select: { orderItems: true },
      },
    },
  })

  return products.map((product) => ({
    ...mapProductSummary(product),
    orderCount: product._count.orderItems,
    categoryName: product.category.name,
  }))
}
