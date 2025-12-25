import { z } from "zod"

const createProductImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

export const createProductSchema = z.object({
  name: z.string().min(1),
  basePrice: z.coerce.number().int().min(1),
  description: z.string().min(1),
  images: createProductImageSchema.array().min(1),
  categoryId: z.string(),
})

const updateProductImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")

export const updateProductSchema = createProductSchema
  .omit({ images: true })
  .extend({
    images: z.array(updateProductImageSchema).optional(),
    keptImages: z.union([z.string(), z.array(z.string())]).optional(),
  })
