import db from "@/lib/db"
import { deleteImage, uploadImage } from "@/lib/image"

import { getCategory } from "./queries"

export async function createCategory(data: { name: string; imagePath: File }) {
  let imageResult = null

  if (data.imagePath && data.imagePath.size > 0) {
    try {
      const uploadResult = await uploadImage(data.imagePath, "products")
      imageResult = uploadResult
    } catch {
      console.error("Error uploading image to Cloudinary")
      throw new Error("Error uploading image to Cloudinary")
    }
  }

  return db.category.create({
    data: {
      name: data.name,
      imagePath: imageResult!.secure_url,
      imagePublicId: imageResult!.public_id,
    },
  })
}

export async function updateCategory(
  id: string,
  data: { name: string; imagePath?: File },
) {
  const category = await getCategory(id)
  if (!category) throw new Error("Not found")

  let imageResult = null

  try {
    if (data.imagePath != null && data.imagePath.size > 0) {
      if (category.imagePublicId) {
        await deleteImage(category.imagePublicId)
      }
      const uploadResult = await uploadImage(data.imagePath, "categories")
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
        imagePath: imageResult.secure_url,
        imagePublicId: imageResult.public_id,
      }),
    },
  })
}
