import { v2 as cloudinary } from "cloudinary"

import { env } from "@/config/env"

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const uploadImage = async (
  file: File,
  folder: string = "catering-app",
) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) {
            reject(error)
            return
          } else {
            resolve({
              secure_url: result!.secure_url,
              public_id: result!.public_id,
            })
          }
        })
        .end(buffer)
    },
  )
}

export const deleteImage = async (publicId: string) => {
  return new Promise<void>((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error) => {
      if (error) {
        reject(error)
        return
      } else {
        resolve()
      }
    })
  })
}
