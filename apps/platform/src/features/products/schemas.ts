import { z } from "zod"

import { optionTemplateSchema } from "../option-templates/schemas"

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

const productOptionSchema = optionTemplateSchema.extend({
  id: z.string(),
  isActive: z.boolean().default(true),
})

export const productSchema = z.object({
  name: z.string().min(1),
  basePrice: z.coerce.number().int().min(1),
  description: z.string().min(1),
  images: z.object({
    new: z.array(z.object({ file: imageSchema })),
    existing: z.array(z.object({ publicId: z.string(), url: z.string() })),
  }),
  categoryId: z.string(),
  options: z.array(productOptionSchema),
})

export type ProductSchemaType = z.infer<typeof productSchema>
