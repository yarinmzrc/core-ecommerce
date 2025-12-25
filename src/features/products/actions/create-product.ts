"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { createProduct } from "../dal/mutations"
import { createProductSchema } from "../schemas"

export async function createProductAction(_: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries())

  const images = (formData.getAll("images") as File[]).filter(
    (file) => file.size > 0,
  )

  const result = createProductSchema.safeParse({
    ...rawData,
    images: images.length > 0 ? images : undefined,
  })

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  await createProduct(data)

  revalidatePath("/")
  revalidatePath("/products")

  redirect(paths.admin.products.root.getHref())
}
