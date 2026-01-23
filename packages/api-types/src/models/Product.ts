import { z } from "zod"
import {
  OptionInput,
  OptionPricingStrategy,
  OptionUI,
  OptionValueSchema,
} from "./OptionTemplate"

const ImageSchema = z.object({
  publicId: z.string(),
  url: z.string(),
})

const ProductOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  inputType: z.enum(OptionInput),
  uiType: z.enum(OptionUI),
  pricingStrategy: z.enum(OptionPricingStrategy),
  values: OptionValueSchema.array().min(1, "Values are required"),
  isActive: z.boolean().default(true),
  required: z.boolean().default(true),
  productId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type ProductOption = z.infer<typeof ProductOptionSchema>

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  slug: z.string(),
  basePrice: z.coerce.number().int().min(1, "Base price is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string(),
  options: z.array(ProductOptionSchema),
  images: z.array(ImageSchema),
  isAvailableForSale: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type Product = z.infer<typeof ProductSchema>

export { type Product, type ProductOption, ProductSchema, ImageSchema }
