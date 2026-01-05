"use server"

import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"

import { deleteProduct } from "../dal/mutations"

export async function deleteProductAction(productId: string) {
  try {
    await deleteProduct(productId)
  } catch (error) {
    console.error(error)
    return notFound()
  }

  revalidatePath("/")
  revalidatePath("/products")
}
