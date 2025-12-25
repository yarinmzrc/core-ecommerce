import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { ProductVariantDTO } from "@/features/products/dtos"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/\--+/g, "-") // Replace multiple - with single -
}

export function buildVariantName(variant: ProductVariantDTO): string {
  const options = variant.selectedOptions as Record<string, string>
  const optionStrings = Object.entries(options).map(([_, value]) => value)
  return optionStrings.join(" / ")
}
