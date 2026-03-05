import z from "zod"
import { AppTypes } from "../shared"

const OptionInput = {
  TEXT: "TEXT",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
} as const

const OptionUI = {
  SELECT: "SELECT",
  MULTI_SELECT: "MULTI_SELECT",
  BOOLEAN: "BOOLEAN",
} as const

const OptionPricingStrategy = {
  NONE: "NONE",
  ADDON: "ADDON",
  PER_UNIT: "PER_UNIT",
} as const

type OptionInputType = (typeof OptionInput)[keyof typeof OptionInput]
type OptionUIType = (typeof OptionUI)[keyof typeof OptionUI]
type OptionPricingStrategyType =
  (typeof OptionPricingStrategy)[keyof typeof OptionPricingStrategy]

const optionValueSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
    .or(z.number().min(1, "Value is required")),
  label: z.string().min(1, "Label is required"),
  priceDelta: z.number().optional(),
})

const optionTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  appType: z.enum(AppTypes),
  inputType: z.enum(OptionInput),
  uiType: z.enum(OptionUI),
  pricingStrategy: z.enum(OptionPricingStrategy),
  values: optionValueSchema.array().min(1, "Values are required"),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type OptionValue = z.infer<typeof optionValueSchema>
type OptionTemplate = z.infer<typeof optionTemplateSchema>

type OptionTemplateCreateInput = Omit<
  OptionTemplate,
  "id" | "createdAt" | "updatedAt"
>

export {
  OptionInput,
  OptionUI,
  OptionPricingStrategy,
  optionTemplateSchema,
  optionValueSchema,
  type OptionInputType,
  type OptionUIType,
  type OptionPricingStrategyType,
  type OptionTemplate,
  type OptionValue,
  type OptionTemplateCreateInput,
}
