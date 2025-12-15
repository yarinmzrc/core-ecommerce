import { prisma } from "../../../../prisma/client"

export const getProducts = async () => {
  return await prisma.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { name: "asc" },
  })
}
