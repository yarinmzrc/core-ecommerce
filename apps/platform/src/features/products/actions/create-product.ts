"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { createProduct } from "../dal/mutations"
import { productSchema } from "../schemas"

export async function createProductAction(values: unknown) {
  const result = productSchema.safeParse(values)

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = {
    ...result.data,
    images: result.data.images.new.map((image) => image.file),
  }

  await createProduct(data)

  revalidatePath("/")
  revalidatePath("/products")

  redirect(paths.admin.products.root.getHref())
}
