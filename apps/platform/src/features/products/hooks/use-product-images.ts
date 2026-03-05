"use client"

import { Image } from "@repo/api-types"
import { useState } from "react"

export function useProductImages(initialImages: Image[] = []) {
  const [existingImages, setExistingImages] = useState<Image[]>(initialImages)
  const [newImageInputs, setNewImageInputs] = useState<number[]>([])

  const addImageInput = () => {
    setNewImageInputs((prev) => [...prev, Date.now()])
  }

  const removeNewImageInput = (id: number) => {
    setNewImageInputs((prev) => prev.filter((inputId) => inputId !== id))
  }

  const removeExistingImage = (publicId: string) => {
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId))
  }

  return {
    existingImages,
    setExistingImages,
    newImageInputs,
    addImageInput,
    removeNewImageInput,
    removeExistingImage,
  }
}
