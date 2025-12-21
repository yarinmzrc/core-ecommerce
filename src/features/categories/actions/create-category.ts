"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { createCategory } from "../dal/mutations"

const createCategorySchema = z.object({
  name: z.string().min(1),
})

export async function createCategoryAction(_: unknown, formData: FormData) {
  const result = createCategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  await createCategory(data.name)

  redirect(paths.admin.categories.root.getHref())
}
