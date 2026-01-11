"use server"

import { z } from "zod"

import { createCategory } from "../dal/mutations"
import { createCategorySchema } from "../schemas"

export async function createCategoryAction(_: unknown, formData: FormData) {
  const result = createCategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return { error: z.flattenError(result.error).fieldErrors }
  }

  const data = result.data

  try {
    await createCategory(data)
    return { success: true }
  } catch (error) {
    console.log(error)
    return {
      error: {
        _form: "Error creating category, please try again",
      },
    }
  }
}
