import { unstable_cache as cache } from "next/cache"

import { CACHE_TTL_IN_SECONDS } from "@/constants"
import db from "@/lib/db"

import { mapBaseProduct, mapProductListItem } from "../mappers"

export const getProduct = cache(
  async (id: string) => {
    const product = await db.product.findUnique({ where: { id } })
    if (!product) return null

    return mapBaseProduct(product)
  },

  ["product"],
  { revalidate: CACHE_TTL_IN_SECONDS },
)

export const getProductsByIds = async (ids: string[]) => {
  return db.product.findMany({ where: { id: { in: ids } } })
}

export const getMostPopularProducts = cache(
  async () => {
    return db.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { orderItems: { _count: "desc" } },
      take: 6,
    })
  },
  ["most-popular-products"],
  { revalidate: CACHE_TTL_IN_SECONDS },
)

export const getNewestProducts = cache(
  async () => {
    return db.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    })
  },
  ["newest-products"],
  { revalidate: CACHE_TTL_IN_SECONDS },
)

export const getProductsForStore = cache(
  async () => {
    return db.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { name: "asc" },
    })
  },
  ["products-for-store"],
  { revalidate: CACHE_TTL_IN_SECONDS },
)

export async function getProductsForAdmin() {
  const products = await db.product.findMany({
    include: {
      category: true,
      _count: {
        select: { orderItems: true },
      },
    },
  })

  return products.map(mapProductListItem)
}
