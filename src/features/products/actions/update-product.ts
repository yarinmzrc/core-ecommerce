"use server"

import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { prisma } from "../../../../prisma/client"
import { updateProduct } from "../dal/mutations"
import { updateProductSchema } from "../schemas"

export async function updateProductAction(
  id: string,
  _: unknown,
  formData: FormData,
) {
  const result = updateProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )
  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  try {
    await updateProduct(id, data)
  } catch (error) {
    console.error(error)
    return notFound()
  }

  revalidatePath("/")
  revalidatePath("/products")

  redirect(paths.admin.products.root.getHref())
}

export async function toggleProductAvailability(
  productId: string,
  isAvailableForSale: boolean,
) {
  await prisma.product.update({
    where: { id: productId },
    data: { isAvailableForSale },
  })
}

export async function deleteProduct(productId: string) {
  const product = await prisma.product.delete({ where: { id: productId } })
  if (product == null) return notFound()

  await fs.unlink(`public${product.imagePath}`)

  revalidatePath("/")
  revalidatePath("/products")
}
