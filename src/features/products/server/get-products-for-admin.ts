import { prisma } from "../../../../prisma/client"

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: { select: { name: true } },
      orderItems: true,
    },
  })
}
