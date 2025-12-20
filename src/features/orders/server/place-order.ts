"use server"

import { z } from "zod"

import { createOrderSchema } from "../schemas"
import { OrderService } from "../services/order-service"

export async function createOrder(
  cartItems: {
    id: string
    quantity: number
  }[],
  _: unknown,
  formData: FormData,
) {
  const result = createOrderSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return { error: z.flattenError(result.error).fieldErrors }
  }

  const orderService = new OrderService()

  const dto = {
    guestEmail: result.data.email,
    guestName: result.data.name,
    guestPhone: result.data.phone,
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  }

  await orderService.createOrder(dto)

  return { success: true }
}
