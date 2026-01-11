import db from "@/lib/db"

import { getProductsByIds } from "../../products/dal/queries"
import { OrderCreateInput } from "../dtos"

export async function createOrder(input: OrderCreateInput) {
  const products = await getProductsByIds(
    input.orderItems.map((i) => i.productId),
  )

  if (products.length !== input.orderItems.length) {
    throw new Error("Product not found")
  }

  const orderItems = input.orderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)!

    let price = product.basePrice
    let variantName: string | null = null
    let variantId: string | undefined

    if (item.variantId) {
      const variant = product.variants.find((v) => v.id === item.variantId)
      if (!variant) {
        throw new Error("Variant not found")
      }

      price = variant.price
      variantId = variant.id

      const options = variant.selectedOptions as Record<string, string>
      variantName = Object.values(options).join(" / ")
    }

    return {
      productId: product.id,
      variantId,
      price,
      quantity: item.quantity,
      name: product.name,
      variantName,
    }
  })

  const pricePaid = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return db.order.create({
    data: {
      pricePaid,
      guestEmail: input.guestEmail,
      guestName: input.guestName,
      guestPhone: input.guestPhone,
      orderItems: {
        create: orderItems,
      },
    },
  })
}
