import {
  OptionInput,
  OptionInputType,
  OptionPricingStrategy,
  OptionPricingStrategyType,
  OptionUI,
  OptionUIType,
} from "@/features/option-templates/dtos"

import {
  AppType,
  AppTypeType,
  StockMode,
  StockModeType,
} from "./app-type.config"

export type BaseOptionTemplate = {
  key: string
  label: string
  required?: boolean
  defaultValue?: unknown
  uiType: OptionUIType
  valueType: OptionInputType
  pricingStrategy: OptionPricingStrategyType
}

export type SelectOptionTemplate<V extends OptionInputType> =
  BaseOptionTemplate & {
    uiType: "SELECT"
    valueType: V
    unitPrice?: number
  }

export type MultiSelectOptionTemplate<V extends OptionInputType> =
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
  | SelectOptionTemplate<OptionInputType>
  | MultiSelectOptionTemplate<OptionInputType>
  | BooleanOptionTemplate

export type AppTypeConfig = {
  usesVariants: boolean
  stockMode: StockModeType
  optionTemplates: OptionTemplate[]
}

export const appTypeConfigMap: Record<AppTypeType, AppTypeConfig> = {
  [AppType.FASHION]: {
    usesVariants: true,
    stockMode: StockMode.PER_VARIANT,
    optionTemplates: [
      {
        key: "color",
        label: "Color",
        uiType: OptionUI.SELECT,
        valueType: OptionInput.TEXT,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
      },
      {
        key: "size",
        label: "Size",
        uiType: OptionUI.SELECT,
        valueType: OptionInput.TEXT,
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
        uiType: OptionUI.SELECT,
        valueType: OptionInput.TEXT,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
      },
      {
        key: "addons",
        label: "תוספות",
        valueType: OptionInput.TEXT,
        uiType: OptionUI.MULTI_SELECT,
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
        uiType: OptionUI.SELECT,
        valueType: OptionInput.NUMBER,
        pricingStrategy: OptionPricingStrategy.PER_UNIT,
        unitPrice: 10,
        required: true,
        defaultValue: 1,
      },
      {
        key: "delivery",
        label: "Delivery",
        uiType: OptionUI.BOOLEAN,
        valueType: OptionInput.BOOLEAN,
        pricingStrategy: OptionPricingStrategy.NONE,
        required: true,
        defaultValue: false,
      },
    ],
  },
}
