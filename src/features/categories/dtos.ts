export type CategoryDTO = {
  id: string
  name: string
  imagePath: string
  imagePublicId: string
  createdAt: Date
  updatedAt: Date
}

export type CategoryWithProductsDTO = CategoryDTO & {
  products: {
    id: string
    name: string
    price: number
    isAvailableForSale: boolean
  }[]
}
