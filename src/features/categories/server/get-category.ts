import { prisma } from "../../../../prisma/client"

export async function getCategory(id: string) {
  return await prisma.category.findUnique({
    where: { id },
    include: { products: true },
  })
}
