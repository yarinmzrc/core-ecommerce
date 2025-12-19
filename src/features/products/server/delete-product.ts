"use server"

import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"

import { prisma } from "../../../../prisma/client"

export async function deleteProduct(productId: string) {
  const product = await prisma.product.delete({ where: { id: productId } })
  if (product == null) return notFound()

  await fs.unlink(`public${product.imagePath}`)

  revalidatePath("/")
  revalidatePath("/products")
}
