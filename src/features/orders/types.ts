import { Prisma } from "../../../prisma/generated/prisma/client"

export type Order = {
  id: string
  total: number
  status: OrderStatus
  guestEmail: string
  guestName?: string
  guestPhone?: string
  orderItems: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export type OrderItem = {
  id: string
  productId: string
  price: number
  quantity: number
  createdAt: Date
}

export const OrderStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
  FULFILLED: "FULFILLED",
}

export type OrderStatus = keyof typeof OrderStatus

export type OrderCreateInput = Prisma.OrderCreateArgs["data"] & {
  orderItems: Prisma.OrderItemUncheckedCreateWithoutOrderInput[]
}
