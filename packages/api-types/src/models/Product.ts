import { z } from "zod"
import { OptionTemplateSchema } from "./OptionTemplate"

const ImageSchema = z.object({
  publicId: z.string(),
  url: z.string(),
})

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  slug: z.string(),
  basePrice: z.coerce.number().int().min(1, "Base price is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string(),
  images: z.array(ImageSchema),
  isAvailableForSale: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type Product = z.infer<typeof ProductSchema>

const ProductOptionSchema = z.object({
  label: z.string(),
  value: z.string().nullable(),
  overrides: OptionTemplateSchema.nullable(),
})

export { type Product, ProductSchema, ImageSchema }
