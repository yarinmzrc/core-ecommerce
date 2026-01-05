import db from "@/lib/db"
import { deleteImage, uploadImage } from "@/lib/image"

import { getCategory } from "./queries"

export async function createCategory(data: { name: string; imageUrl: File }) {
  let imageResult = null

  if (data.imageUrl && data.imageUrl.size > 0) {
    try {
      const uploadResult = await uploadImage(data.imageUrl, "products")
      imageResult = uploadResult
    } catch {
      console.error("Error uploading image to Cloudinary")
      throw new Error("Error uploading image to Cloudinary")
    }
  }

  return db.category.create({
    data: {
      name: data.name,
      imageUrl: imageResult!.secure_url,
      imagePublicId: imageResult!.public_id,
    },
  })
}

export async function updateCategory(
  id: string,
  data: { name: string; imageUrl?: File },
) {
  const category = await getCategory(id)
  if (!category) throw new Error("Not found")

  let imageResult = null

  try {
    if (data.imageUrl != null && data.imageUrl.size > 0) {
      if (category.imagePublicId) {
        await deleteImage(category.imagePublicId)
      }
      const uploadResult = await uploadImage(data.imageUrl, "categories")
      imageResult = uploadResult
    }
  } catch {
    console.error("Error uploading image to Cloudinary")
    throw new Error("Error uploading image to Cloudinary")
  }

  return db.category.update({
    where: { id },
    data: {
      name: data.name,
      ...(imageResult != null && {
        imageUrl: imageResult.secure_url,
        imagePublicId: imageResult.public_id,
      }),
    },
  })
}
