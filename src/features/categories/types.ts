export type Category = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date

  products?: {
    id: string
    name: string
    price: number
    isAvailableForSale: boolean
  }[]
}
