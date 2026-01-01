import { z } from "zod"

import { createOptionTemplateSchema } from "../option-templates/schemas"

const createProductImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

export const createProductSchema = z.object({
  name: z.string().min(1),
  basePrice: z.coerce.number().int().min(1),
  description: z.string().min(1),
  images: z.array(z.object({ file: createProductImageSchema })),
  categoryId: z.string(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string().nullable(),
      overrides: createOptionTemplateSchema.nullable(),
    }),
  ),
})

export type CreateProductSchemaType = z.infer<typeof createProductSchema>

const updateProductImageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

export const updateProductSchema = createProductSchema
  .omit({ images: true })
  .extend({
    newImages: z.array(z.object({ file: updateProductImageSchema })),
    existingImages: z.array(
      z.object({ publicId: z.string(), url: z.string() }),
    ),
  })

export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>
