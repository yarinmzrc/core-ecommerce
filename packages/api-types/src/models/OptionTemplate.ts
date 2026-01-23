import z from "zod"

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

const OptionValueSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
    .or(z.number().min(1, "Value is required")),
  label: z.string().min(1, "Label is required"),
  priceDelta: z.number().optional(),
})

const OptionTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  inputType: z.enum(OptionInput),
  uiType: z.enum(OptionUI),
  pricingStrategy: z.enum(OptionPricingStrategy),
  values: OptionValueSchema.array().min(1, "Values are required"),
  required: z.boolean().default(true),
})

export {
  OptionInput,
  OptionUI,
  OptionPricingStrategy,
  OptionTemplateSchema,
  OptionValueSchema,
  type OptionInputType,
  type OptionUIType,
  type OptionPricingStrategyType,
}
