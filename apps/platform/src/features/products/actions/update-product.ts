"use server"

import { notFound, redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { updateProduct } from "../dal/mutations"
import { productSchema } from "../schemas"

export async function updateProductAction(id: string, values: unknown) {
  const result = productSchema.safeParse({
    values,
  })

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = {
    ...result.data,
    images: result.data.images.new.map((image) => image.file),
    keptImages: result.data.images.existing.map((image) => image.publicId),
  }

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

  redirect(paths.admin.products.root.getHref())
}
