"use server"

import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "../../../../prisma/client"
import { revalidatePath } from "next/cache"
import { getProduct } from "@/features/products/server/get-product"

const requiredImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

const optionalImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .optional()

const addProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(1),
  imagePath: requiredImageSchema,
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

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

const updateProductSchema = addProductSchema.omit({ imagePath: true }).extend({
  imagePath: optionalImageSchema,
})

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

  revalidatePath("/")
  revalidatePath("/products")

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

  revalidatePath("/")
  revalidatePath("/products")
}
