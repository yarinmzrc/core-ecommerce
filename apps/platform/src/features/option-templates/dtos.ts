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
export type OptionPricingStrategyType =
  (typeof OptionPricingStrategy)[keyof typeof OptionPricingStrategy]
