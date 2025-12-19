"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { CategoryService } from "../services/category-service"

const createCategorySchema = z.object({
  name: z.string().min(1),
})

export async function createCategory(_: unknown, formData: FormData) {
  const result = createCategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  const categoryService = new CategoryService()
  await categoryService.createCategory(data.name)

  redirect(paths.admin.categories.root.getHref())
}
