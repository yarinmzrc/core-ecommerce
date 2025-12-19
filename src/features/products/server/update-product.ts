"use server"

import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"
import { getProduct } from "@/features/products/server/get-product"
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary"

import { prisma } from "../../../../prisma/client"
import { updateProductSchema } from "../schemas"

export async function updateProduct(
  id: string,
  _: unknown,
  formData: FormData,
) {
  const result = updateProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )
  console.log({ result })
  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data
  const product = await getProduct(id)

  if (product == null) return notFound()

  let imageResult = null
  if (data.imagePath != null && data.imagePath.size > 0) {
    await deleteFromCloudinary(product.imagePublicId)

    try {
      const uploadResult = await uploadToCloudinary(data.imagePath, "products")
      imageResult = uploadResult
    } catch {
      console.error("Error uploading image to Cloudinary")
      throw new Error("Error uploading image to Cloudinary")
    }
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath: imageResult!.secure_url,
      imagePublicId: imageResult!.public_id,
      categoryId: data.categoryId,
    },
  })

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
