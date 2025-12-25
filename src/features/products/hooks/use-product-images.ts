import { useState } from "react"

import type { ImageDTO } from "../dtos"

export function useProductImages(initialImages: ImageDTO[] = []) {
  const [existingImages, setExistingImages] =
    useState<ImageDTO[]>(initialImages)
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
