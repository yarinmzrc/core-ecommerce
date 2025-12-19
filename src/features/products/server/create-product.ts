"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"
import { uploadToCloudinary } from "@/lib/cloudinary"

import { prisma } from "../../../../prisma/client"
import { createProductSchema } from "../schemas"

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
