import { cache } from "@/lib/cache"
import { prisma } from "../../../../prisma/client"

export const getProducts = cache(async () => {
  return await prisma.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { name: "asc" },
  })
}, ["/products", "getProducts"])
