"use server"

import { z } from "zod"

import { createOrder } from "../dal/mutations"
import { createOrderSchema } from "../schemas"

export async function createOrderAction(
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

  const dto = {
    guestEmail: result.data.email,
    guestName: result.data.name,
    guestPhone: result.data.phone,
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  }

  await createOrder(dto)

  return { success: true }
}
