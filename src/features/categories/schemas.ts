import { z } from "zod"

const createCategoryImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

export const createCategorySchema = z.object({
  name: z.string().min(1),
  imageUrl: createCategoryImageSchema,
})

const updateCategoryImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .optional()

export const updateCategorySchema = createCategorySchema
  .omit({ imageUrl: true })
  .extend({
    imageUrl: updateCategoryImageSchema,
  })
