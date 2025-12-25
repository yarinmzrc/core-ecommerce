"use client"

import { useTranslations } from "next-intl"
import { useActionState, useState } from "react"

import { Button } from "@/components/ui/button/button"
import { FormError } from "@/components/ui/form/form-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CategoryDTO } from "@/features/categories/dtos"
import { formatCurrency } from "@/lib/format"

import { createProductAction } from "../../actions/create-product"
import { updateProductAction } from "../../actions/update-product"
import { ProductDTO } from "../../dtos"
import { useProductImages } from "../../hooks/use-product-images"
import { ProductImages } from "./product-images"

type ProductFormProps = {
  product?: ProductDTO
  categories: CategoryDTO[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const t = useTranslations("admin.products.form")
  const buttonsT = useTranslations("buttons")

  const [error, action, pending] = useActionState(
    product == null
      ? createProductAction
      : updateProductAction.bind(null, product.id),
    {},
  )

  const [basePrice, setBasePrice] = useState<number | null>(
    product?.basePrice ?? null,
  )

  const {
    existingImages,
    newImageInputs,
    addImageInput,
    removeNewImageInput,
    removeExistingImage,
  } = useProductImages(product?.images ?? [])

  return (
    <form action={action} className="space-y-8">
      {/* Hidden kept images for backend */}
      {existingImages.map((img) => (
        <input
          key={img.publicId}
          type="hidden"
          name="keptImages"
          value={img.publicId}
        />
      ))}

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={product?.name ?? ""}
        />
        {error?.name && <FormError error={error.name[0]} />}
      </div>

      {/* Price Field */}
      <div className="space-y-2">
        <Label htmlFor="basePrice">{t("price")}</Label>
        <Input
          type="number"
          id="basePrice"
          name="basePrice"
          value={basePrice ?? ""}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          required
        />
        {error?.basePrice && (
          <div className="text-red-500">{error.basePrice}</div>
        )}
        <div className="text-muted-foreground">
          {formatCurrency(basePrice ?? 0)}
        </div>
      </div>

      {/* Category Field */}
      <div className="space-y-2">
        <Label htmlFor="categoryId">{t("category")}</Label>
        <Select name="categoryId" defaultValue={product?.categoryId} required>
          <SelectTrigger id="categoryId" className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error?.categoryId && (
          <div className="text-red-500">{error.categoryId}</div>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description">{t("description")}</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description ?? ""}
        />
        {error?.description && (
          <div className="text-red-500">{error.description}</div>
        )}
      </div>

      {/* Images Field */}
      <ProductImages
        existingImages={existingImages}
        onRemoveExisting={removeExistingImage}
        newImageInputs={newImageInputs}
        onAddNew={addImageInput}
        onRemoveNew={removeNewImageInput}
        error={error?.images?.[0]}
      />

      {/* Submit Button */}
      <Button type="submit" disabled={pending}>
        {pending ? buttonsT("saving") : buttonsT("save")}
      </Button>
    </form>
  )
}
