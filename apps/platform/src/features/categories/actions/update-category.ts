"use server"

import { z } from "zod"

import { updateCategory } from "../dal/mutations"
import { updateCategorySchema } from "../schemas"

export async function updateCategoryAction(
  id: string,
  _: unknown,
  formData: FormData,
) {
  const result = updateCategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return { error: z.flattenError(result.error).fieldErrors }
  }

  const data = result.data

  try {
    await updateCategory(id, data)

    return { success: true }
  } catch (error) {
    console.log(error)
    return {
      error: {
        _form: "Error updating category, please try again",
      },
    }
  }
}
