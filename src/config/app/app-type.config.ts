export const AppType = {
  FOOD: "FOOD",
  FASHION: "FASHION",
  CATERING: "CATERING",
} as const

export const StockMode = {
  PER_PRODUCT: "PER_PRODUCT",
  PER_VARIANT: "PER_VARIANT",
  NONE: "NONE",
} as const

export type AppType = (typeof AppType)[keyof typeof AppType]
export type StockModeType = (typeof StockMode)[keyof typeof StockMode]
