import { cache } from "@/lib/cache"
import { prisma } from "../../../../prisma/client"
import { ONE_DAY_IN_SECONDS } from "@/constants"

export const getMostPopularProducts = cache(
  async () => {
    return await prisma.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { orderItems: { _count: "desc" } },
      take: 6,
    })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: ONE_DAY_IN_SECONDS },
)
