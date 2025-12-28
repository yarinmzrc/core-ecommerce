import { AppType, StockMode, StockModeType } from "./app-type.config"

export type OptionValue<V extends OptionValueType> = {
  value: OptionValueTypeMap[V]
  label: string
  priceDelta?: number
}

export const OptionValueType = {
  STRING: "STRING",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
} as const

export type OptionValueType =
  (typeof OptionValueType)[keyof typeof OptionValueType]

export type OptionValueTypeMap = {
  STRING: string
  NUMBER: number
  BOOLEAN: boolean
}

export const OptionUIType = {
  SELECT: "SELECT",
  MULTI_SELECT: "MULTI_SELECT",
  BOOLEAN: "BOOLEAN",
} as const

export const OptionPricingStrategy = {
  NONE: "NONE",
  ADDON: "ADDON",
  PER_UNIT: "PER_UNIT",
} as const

export type OptionUIType = (typeof OptionUIType)[keyof typeof OptionUIType]
export type OptionPricingStrategyType =
  (typeof OptionPricingStrategy)[keyof typeof OptionPricingStrategy]

export type BaseOptionTemplate = {
  key: string
  label: string
  required?: boolean
  defaultValue?: unknown
  uiType: OptionUIType
  valueType: OptionValueType
  pricingStrategy: OptionPricingStrategyType
}

export type SelectOptionTemplate<V extends OptionValueType> =
  BaseOptionTemplate & {
    uiType: "SELECT"
    valueType: V
    unitPrice?: number
  }

export type MultiSelectOptionTemplate<V extends OptionValueType> =
  BaseOptionTemplate & {
    uiType: "MULTI_SELECT"
    valueType: V
    min?: number
    max?: number
  }

export type BooleanOptionTemplate = BaseOptionTemplate & {
  uiType: "BOOLEAN"
  valueType: "BOOLEAN"
}

export type OptionTemplate =
  | SelectOptionTemplate<OptionValueType>
  | MultiSelectOptionTemplate<OptionValueType>
  | BooleanOptionTemplate

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
        uiType: OptionUIType.SELECT,
        valueType: OptionValueType.STRING,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
      },
      {
        key: "size",
        label: "Size",
        uiType: OptionUIType.SELECT,
        valueType: OptionValueType.STRING,
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
        label: "מידת עשייה",
        uiType: OptionUIType.SELECT,
        valueType: OptionValueType.STRING,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
      },
      {
        key: "addons",
        label: "תוספות",
        valueType: OptionValueType.STRING,
        uiType: OptionUIType.MULTI_SELECT,
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
        uiType: OptionUIType.SELECT,
        valueType: OptionValueType.NUMBER,
        pricingStrategy: OptionPricingStrategy.PER_UNIT,
        unitPrice: 10,
        required: true,
        defaultValue: 1,
      },
      {
        key: "delivery",
        label: "Delivery",
        uiType: OptionUIType.BOOLEAN,
        valueType: OptionValueType.BOOLEAN,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
        defaultValue: false,
      },
    ],
  },
}
