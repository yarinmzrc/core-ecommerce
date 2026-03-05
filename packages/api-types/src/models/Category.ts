import { z } from "zod"

export type CategoryDTO = {
  id: string
  name: string
  imageUrl: string
  imagePublicId: string
  createdAt: Date
  updatedAt: Date
}

const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string(),
  imagePublicId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type Category = z.infer<typeof categorySchema>
type CategoryCreateInput = Omit<Category, "id" | "createdAt" | "updatedAt">

export { type Category, type CategoryCreateInput, categorySchema }
