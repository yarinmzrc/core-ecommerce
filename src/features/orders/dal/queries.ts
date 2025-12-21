import db from "@/lib/db"

import { mapOrderToDTO } from "../mappers"

export async function getOrders({
  page = 1,
  pageSize = 10,
}: {
  page?: number
  pageSize?: number
}) {
  const skip = (page - 1) * pageSize
  const [orders, total] = await Promise.all([
    db.order.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    db.order.count(),
  ])

  const totalPages = Math.ceil(total / pageSize)

  return {
    data: orders.map(mapOrderToDTO),
    metadata: {
      total,
      page,
      pageSize,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}

export async function getOrder(id: string) {
  return db.order.findUnique({ where: { id } })
}
