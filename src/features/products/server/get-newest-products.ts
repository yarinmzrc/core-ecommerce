import { cache } from "@/lib/cache"
import { prisma } from "../../../../prisma/client"

export const getNewestProducts = cache(async () => {
  return await prisma.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}, ["/", "getNewestProducts"])
