import { z } from "zod"

import { OptionInput, OptionPricingStrategy, OptionUI } from "./dtos"

export const optionValueSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
    .or(z.number().min(1, "Value is required")),
  label: z.string().min(1, "Label is required"),
  priceDelta: z.number().optional(),
})

export const optionTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  inputType: z.enum(OptionInput),
  uiType: z.enum(OptionUI),
  pricingStrategy: z.enum(OptionPricingStrategy),
  values: optionValueSchema.array().min(1, "Values are required"),
  required: z.boolean().default(true),
})

export type OptionTemplateSchemaType = z.infer<typeof optionTemplateSchema>
