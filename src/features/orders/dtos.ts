export type OrderDTO = {
  id: string
  total: number
  status: OrderStatus
  guestEmail: string
  guestName?: string
  guestPhone?: string
  createdAt: Date
  updatedAt: Date
}

export type OrderItemDTO = {
  id: string
  name: string
  productId: string
  variantName: string | null
  price: number
  quantity: number
  createdAt: Date
}

export const OrderStatus = {
  PENDING: "ממתין",
  PAID: "שולם",
  CANCELLED: "בוטל",
  FULFILLED: "הושלם",
}

export type OrderStatus = keyof typeof OrderStatus

export type OrderCreateInput = Pick<
  OrderDTO,
  "guestEmail" | "guestName" | "guestPhone"
> & {
  orderItems: (Pick<OrderItemDTO, "productId" | "quantity"> & {
    variantId?: string
  })[]
}
