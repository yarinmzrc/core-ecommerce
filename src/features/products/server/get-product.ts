import { prisma } from "../../../../prisma/client"

export const getProduct = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } })
}
