"use server"

import db from "@/lib/db"
import { deleteImage, uploadImage } from "@/lib/image"

import { getProduct } from "./queries"

export async function createProduct(data: {
  name: string
  price: number
  description: string
  imagePath: File
  categoryId: string
}) {
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

  return db.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath: imageResult!.secure_url,
      imagePublicId: imageResult!.public_id,
      categoryId: data.categoryId,
    },
  })
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    price: number
    description: string
    imagePath?: File
    categoryId: string
  },
) {
  const product = await getProduct(id)
  if (!product) throw new Error("Not found")

  let imageResult = null
  if (data.imagePath != null && data.imagePath.size > 0) {
    await deleteImage(product.imagePublicId)

    try {
      const uploadResult = await uploadImage(data.imagePath, "products")
      imageResult = uploadResult
    } catch {
      console.error("Error uploading image to Cloudinary")
      throw new Error("Error uploading image to Cloudinary")
    }
  }

  return db.product.update({
    where: { id: product.id },
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath: imageResult!.secure_url,
      imagePublicId: imageResult!.public_id,
      categoryId: data.categoryId,
    },
  })
}

export async function deleteProduct(id: string) {
  const product = await getProduct(id)
  if (!product) throw new Error("Not found")

  await deleteImage(product.imagePublicId)

  return db.product.delete({ where: { id } })
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForSale: boolean,
) {
  return db.product.update({
    where: { id },
    data: { isAvailableForSale },
  })
}
