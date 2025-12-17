import { prisma } from "../../../../prisma/client"
import { mapProductWithCategoryAndOrderCount } from "../mappers"

export async function getProductsForAdmin() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      _count: {
        select: { orderItems: true },
      },
    },
  })

  return products.map(mapProductWithCategoryAndOrderCount)
}
