import db from "@/lib/db"

export async function getOrders() {
  return db.order.findMany()
}

export async function getOrder(id: string) {
  return db.order.findUnique({ where: { id } })
}
