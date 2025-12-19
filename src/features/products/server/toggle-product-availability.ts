"use server"

import { prisma } from "../../../../prisma/client"

export async function toggleProductAvailability(
  productId: string,
  isAvailableForSale: boolean,
) {
  await prisma.product.update({
    where: { id: productId },
    data: { isAvailableForSale },
  })
}
