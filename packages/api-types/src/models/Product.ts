import { z } from "zod"
import {
  OptionInput,
  OptionPricingStrategy,
  OptionUI,
  optionValueSchema,
} from "./OptionTemplate"

const imageSchema = z.object({
  publicId: z.string(),
  url: z.string(),
})

type Image = z.infer<typeof imageSchema>

const productOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  inputType: z.enum(OptionInput),
  uiType: z.enum(OptionUI),
  pricingStrategy: z.enum(OptionPricingStrategy),
  values: optionValueSchema.array().min(1, "Values are required"),
  isActive: z.boolean().default(true),
  required: z.boolean().default(true),
  productId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type ProductOption = z.infer<typeof productOptionSchema>

const productVariantSchema = z.object({
  id: z.string(),
  sku: z.string().nullable(),
  price: z.coerce.number().int(),
  stockQuantity: z.coerce.number().int().default(0),
  images: z.array(imageSchema),
  selectedOptions: z.record(z.string(), z.string()),
  productId: z.string(),
})

type ProductVariant = z.infer<typeof productVariantSchema>

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  slug: z.string(),
  basePrice: z.coerce.number().int().min(1, "Base price is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string(),
  options: z.array(productOptionSchema),
  variants: z.array(productVariantSchema),
  images: z.array(imageSchema),
  isAvailableForSale: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type Product = z.infer<typeof ProductSchema>
type ProductCreateInput = Omit<Product, "id" | "createdAt" | "updatedAt">

type ProductSummary = Omit<Product, "options" | "variants">

export {
  type Product,
  type ProductOption,
  type ProductVariant,
  type ProductSummary,
  type Image,
  type ProductCreateInput,
  ProductSchema,
  productVariantSchema,
  productOptionSchema,
  imageSchema,
}
