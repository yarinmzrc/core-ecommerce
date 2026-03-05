import { ProductSummary } from "@repo/api-types"

export type AdminProductSummary = ProductSummary & {
  categoryName: string
  orderCount: number
}
