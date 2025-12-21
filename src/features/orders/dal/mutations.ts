import db from "@/lib/db"

import { getProductsByIds } from "../../products/dal/queries"

export async function createOrder(dto: {
  guestEmail: string
  guestName?: string
  guestPhone?: string
  items: { productId: string; quantity: number }[]
}) {
  const products = await getProductsByIds(dto.items.map((i) => i.productId))

  if (products.length !== dto.items.length) {
    throw new Error("Product not found")
  }

  const orderItems = dto.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!
    return {
      productId: product.id,
      price: product.price,
      quantity: item.quantity,
    }
  })

  const pricePaid = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return db.order.create({
    data: {
      pricePaid,
      guestEmail: dto.guestEmail,
      guestName: dto.guestName,
      guestPhone: dto.guestPhone,
      orderItems: {
        create: orderItems,
      },
    },
  })
}
