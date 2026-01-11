"use client"

import NextImage, { ImageProps } from "next/image"
import { useState } from "react"

const FALLBACK_IMAGE = "/images/placeholder.jpg"

export function Image({ src, alt, ...props }: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null)

  const activeSrc = failedSrc === src || !src ? FALLBACK_IMAGE : src

  return (
    <NextImage
      src={activeSrc}
      alt={alt}
      onError={() => setFailedSrc(src)}
      {...props}
    />
  )
}
