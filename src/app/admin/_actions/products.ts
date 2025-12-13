"use server"

import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "../../../../prisma/client"

const imageSchema = z
  .instanceof(File, { error: "Image is required" })
  .refine(
    (file) => file.size === 0 || file.type.startsWith("image/"),
    "Required",
  )
  .refine((file) => file.size > 0, "Image is required")

const addProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(1),
  imagePath: imageSchema,
  categoryId: z.string(),
})

export async function addProduct(_: unknown, formData: FormData) {
  const result = addProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.imagePath.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.imagePath.arrayBuffer()),
  )

  await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath,
      categoryId: data.categoryId,
    },
  })

  redirect("/admin/products")
}

const updateProductSchema = addProductSchema.extend({
  imagePath: imageSchema.optional(),
})

export async function updateProduct(
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
  const product = await prisma.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  let imagePath = product.imagePath
  if (data.imagePath != null && data.imagePath.size > 0) {
    await fs.unlink(`public${product.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.imagePath.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.imagePath.arrayBuffer()),
    )
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath,
      categoryId: data.categoryId,
    },
  })

  redirect("/admin/products")
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
}
