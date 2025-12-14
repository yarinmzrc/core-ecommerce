import { prisma } from "../../../../prisma/client"

export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })
}
