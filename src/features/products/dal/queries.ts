import db from "@/lib/db"

import { mapProductWithCategoryAndOrderCount } from "../mappers"

export async function getProduct(id: string) {
  return db.product.findUnique({ where: { id } })
}

export async function getProductsByIds(ids: string[]) {
  return db.product.findMany({ where: { id: { in: ids } } })
}

export async function getMostPopularProducts() {
  return db.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { orderItems: { _count: "desc" } },
    take: 6,
  })
}

export async function getNewestProducts() {
  return db.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}

export async function getProductsForStore() {
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

  return products.map(mapProductWithCategoryAndOrderCount)
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForSale: boolean,
) {
  return db.product.update({
    where: { id },
    data: { isAvailableForSale },
  })
}
