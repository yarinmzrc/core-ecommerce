"use server"

import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { updateProduct } from "../dal/mutations"
import { updateProductSchema } from "../schemas"

export async function updateProductAction(
  id: string,
  _: unknown,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries())
  const images = (formData.getAll("images") as File[]).filter(
    (file) => file.size > 0,
  )

  const keptImages = formData.getAll("keptImages") as string[]

  const result = updateProductSchema.safeParse({
    ...rawData,
    images: images.length > 0 ? images : undefined,
    keptImages,
  })

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  try {
    await updateProduct(id, {
      ...data,
      keptImages:
        typeof data.keptImages === "string"
          ? [data.keptImages]
          : data.keptImages,
    })
  } catch (error) {
    console.error(error)
    return notFound()
  }

  revalidatePath("/")
  revalidatePath("/products")

  redirect(paths.admin.products.root.getHref())
}
