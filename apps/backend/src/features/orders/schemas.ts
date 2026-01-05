import { z } from "zod"

export const createOrderSchema = z.object({
  email: z.email(),
  name: z.string().optional(),
  phone: z.string().optional(),
})
