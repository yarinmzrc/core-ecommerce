"use server"

import db from "@/lib/db"
import {
  deleteImage,
  deleteImages,
  uploadImage,
  uploadImages,
} from "@/lib/image"
import { slugify } from "@/lib/utils"

import { getProduct } from "./queries"

export async function createProduct(data: {
  name: string
  basePrice: number
  description: string
  images: File[]
  categoryId: string
}) {
  let imagesResult = null

  if (data.images && data.images.length > 0) {
    try {
      const uploadResult = await uploadImages(data.images, "products")
      imagesResult = uploadResult
    } catch {
      console.error("Error uploading image to Cloudinary")
      throw new Error("Error uploading image to Cloudinary")
    }
  }

  const slug = slugify(data.name)

  return db.product.create({
    data: {
      name: data.name,
      slug,
      basePrice: data.basePrice,
      description: data.description,
      images: imagesResult!.map((img) => ({
        url: img.secure_url,
        publicId: img.public_id,
      })),
      categoryId: data.categoryId,
    },
  })
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    basePrice: number
    description: string
    images?: File[]
    keptImages?: string[]
    categoryId: string
  },
) {
  const product = await getProduct(id)
  if (!product) throw new Error("Not found")

  const keptImages = product.images.filter((img) =>
    data.keptImages?.includes(img.publicId),
  )

  const imagesToDelete = product.images.filter(
    (img) => !data.keptImages?.includes(img.publicId),
  )

  if (imagesToDelete.length > 0) {
    for (const image of imagesToDelete) {
      try {
        await deleteImage(image.publicId)
      } catch (error) {
        console.error(`Error deleting image ${image.publicId}: ${error}`)
      }
    }
  }

  const newImages: { url: string; publicId: string }[] = []

  if (data.images && data.images.length > 0) {
    for (const file of data.images) {
      try {
        const uploadResult = await uploadImage(file, "products")
        newImages.push({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        })
      } catch {
        console.error("Error uploading image to Cloudinary")
        throw new Error("Error uploading image to Cloudinary")
      }
    }
  }

  return db.product.update({
    where: { id: product.id },
    data: {
      name: data.name,
      basePrice: data.basePrice,
      description: data.description,
      images: [...keptImages, ...newImages],
      categoryId: data.categoryId,
    },
  })
}

export async function deleteProduct(id: string) {
  const product = await getProduct(id)
  if (!product) throw new Error("Not found")

  await deleteImages(product.images.map((img) => img.publicId))

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
