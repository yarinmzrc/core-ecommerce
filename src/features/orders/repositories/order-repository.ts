import { prisma } from "../../../../prisma/client"
import { OrderCreateInput } from "../types"

export class OrderRepository {
  async getOrders() {
    return prisma.order.findMany()
  }

  async getOrder(id: string) {
    return prisma.order.findUnique({ where: { id } })
  }

  async createOrder(data: OrderCreateInput) {
    prisma.order.create({
      data: {
        pricePaid: data.pricePaid,
        guestEmail: data.guestEmail,
        guestName: data.guestName,
        guestPhone: data.guestPhone,
        orderItems: {
          create: data.orderItems,
        },
      },
    })
  }
}
