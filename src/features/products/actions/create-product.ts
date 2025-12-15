"use server"

import { z } from "zod"
import { prisma } from "../../../../prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { paths } from "@/config/paths"
import { uploadToCloudinary } from "@/lib/cloudinary"

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), "Invalid image type")
  .refine((file) => file.size > 0, "Image is required")

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(1),
  imagePath: imageSchema,
  categoryId: z.string(),
})

export async function createProduct(_: unknown, formData: FormData) {
  const result = createProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  let imageResult = null

  if (data.imagePath && data.imagePath.size > 0) {
    try {
      const uploadResult = await uploadToCloudinary(data.imagePath, "products")
      imageResult = uploadResult
    } catch {
      console.error("Error uploading image to Cloudinary")
      throw new Error("Error uploading image to Cloudinary")
    }
  }

  await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath: imageResult!.secure_url,
      imagePublicId: imageResult!.public_id,
      categoryId: data.categoryId,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect(paths.admin.products.root.getHref())
}
