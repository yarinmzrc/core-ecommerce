import type { AppTypeType as AppType } from "@/config/app/app-type.config"

export type OptionTemplateDTO = {
  id: string
  name: string
  appType: AppType
  inputType: OptionInputType
  uiType: OptionUIType
  pricingStrategy: OptionPricingStrategy
  values: Record<string, unknown>[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type OptionTemplateCreateDTO = Pick<
  OptionTemplateDTO,
  | "name"
  | "appType"
  | "inputType"
  | "uiType"
  | "pricingStrategy"
  | "values"
  | "isActive"
>

export type OptionTemplateUpdateDTO = Partial<OptionTemplateCreateDTO>

export type OptionValueDTO = {
  value: string | number
  label: string
  priceDelta?: number
}

export const OptionInput = {
  TEXT: "TEXT",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
} as const

export const OptionUI = {
  SELECT: "SELECT",
  MULTI_SELECT: "MULTI_SELECT",
  BOOLEAN: "BOOLEAN",
} as const

export const OptionPricingStrategy = {
  NONE: "NONE",
  ADDON: "ADDON",
  PER_UNIT: "PER_UNIT",
} as const

export type OptionInputType = (typeof OptionInput)[keyof typeof OptionInput]
export type OptionUIType = (typeof OptionUI)[keyof typeof OptionUI]
export type OptionPricingStrategy =
  (typeof OptionPricingStrategy)[keyof typeof OptionPricingStrategy]
