import { AppType, StockMode, StockModeType } from "./app-type.config"

export const OptionInputType = {
  SELECT: "SELECT",
  MULTI_SELECT: "MULTI_SELECT",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
} as const

export const OptionPricingStrategy = {
  NONE: "NONE",
  ADDON: "ADDON",
  PER_UNIT: "PER_UNIT",
} as const

export type OptionInputType =
  (typeof OptionInputType)[keyof typeof OptionInputType]
export type OptionPricingStrategyType =
  (typeof OptionPricingStrategy)[keyof typeof OptionPricingStrategy]

export type BaseOptionTemplate = {
  key: string
  label: string
  required?: boolean
  defaultValue?: unknown
}

export type AddonOption = BaseOptionTemplate & {
  pricingStrategy: typeof OptionPricingStrategy.ADDON
  inputType: typeof OptionInputType.MULTI_SELECT
}

export type PerUnitOption = BaseOptionTemplate & {
  pricingStrategy: typeof OptionPricingStrategy.PER_UNIT
  inputType: typeof OptionInputType.NUMBER
  unitPrice: number
}

export type NonPricedOption = BaseOptionTemplate & {
  pricingStrategy: typeof OptionPricingStrategy.NONE
  inputType: typeof OptionInputType.SELECT | typeof OptionInputType.BOOLEAN
}

export type OptionTemplate = AddonOption | PerUnitOption | NonPricedOption

export type AppTypeConfig = {
  usesVariants: boolean
  stockMode: StockModeType
  optionTemplates: OptionTemplate[]
}

export const appTypeConfigMap: Record<AppType, AppTypeConfig> = {
  [AppType.FASHION]: {
    usesVariants: true,
    stockMode: StockMode.PER_VARIANT,
    optionTemplates: [
      {
        key: "color",
        label: "Color",
        inputType: OptionInputType.SELECT,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
      },
      {
        key: "size",
        label: "Size",
        inputType: OptionInputType.SELECT,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
      },
    ],
  },

  [AppType.FOOD]: {
    usesVariants: false,
    stockMode: StockMode.PER_PRODUCT,
    optionTemplates: [
      {
        key: "cookingLevel",
        label: "Cooking Level",
        inputType: OptionInputType.SELECT,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
      },
      {
        key: "addons",
        label: "Add-ons",
        inputType: OptionInputType.MULTI_SELECT,
        pricingStrategy: OptionPricingStrategy.ADDON,
        required: false,
      },
    ],
  },

  [AppType.CATERING]: {
    usesVariants: false,
    stockMode: StockMode.NONE,
    optionTemplates: [
      {
        key: "guests",
        label: "Guests",
        inputType: OptionInputType.NUMBER,
        pricingStrategy: OptionPricingStrategy.PER_UNIT,
        unitPrice: 10,
        required: true,
        defaultValue: 1,
      },
      {
        key: "delivery",
        label: "Delivery",
        inputType: OptionInputType.BOOLEAN,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
        defaultValue: false,
      },
    ],
  },
}
