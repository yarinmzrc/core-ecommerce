import { Order as PrismaOrder } from "../../../prisma/generated/prisma/client"
import { OrderDTO } from "./dtos"

export const mapOrderToDTO = (order: PrismaOrder): OrderDTO => ({
  id: order.id,
  total: order.pricePaid,
  status: order.status,
  guestEmail: order.guestEmail,
  guestName: order.guestName ?? undefined,
  guestPhone: order.guestPhone ?? undefined,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
})
