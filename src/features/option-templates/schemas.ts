import { z } from "zod"

import { OptionInput, OptionPricingStrategy, OptionUI } from "./dtos"

export const optionValueSchema = z.object({
  value: z.string().or(z.number()),
  label: z.string(),
  priceDelta: z.number().optional(),
})

export const createOptionTemplateSchema = z.object({
  name: z.string().min(1),
  inputType: z.enum(OptionInput),
  uiType: z.enum(OptionUI),
  pricingStrategy: z.enum(OptionPricingStrategy),
  values: optionValueSchema.array().min(1),
  isActive: z.boolean().default(true),
  required: z.boolean().default(true),
})

export type CreateOptionTemplateSchema = z.infer<
  typeof createOptionTemplateSchema
>

export const updateOptionTemplateSchema = createOptionTemplateSchema
  .omit({ isActive: true })
  .extend({
    isActive: z.boolean().optional(),
  })
