"use client"

import Image from "next/image"
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button/button"
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
import { createProductAction } from "@/features/products/actions/create-product"
import { updateProductAction } from "@/features/products/actions/update-product"
import { formatCurrency } from "@/lib/format"

import {
  Category,
  Product,
} from "../../../../../../prisma/generated/prisma/client"

type ProductFormProps = {
  product?: Product
  categories: Category[]
}
export function ProductForm({ product, categories }: ProductFormProps) {
  const [error, action] = useActionState(
    product == null
      ? createProductAction
      : updateProductAction.bind(null, product.id),
    {},
  )
  const [basePrice, setBasePrice] = useState<number | null>(
    product?.basePrice ?? null,
  )

  const [existingImages, setExistingImages] = useState(product?.images ?? [])
  const [newImageInputs, setNewImageInputs] = useState<number[]>([])

  const handleAddImageInput = () => {
    setNewImageInputs((prev) => [...prev, Date.now()])
  }

  const handleRemoveNewImageInput = (id: number) => {
    setNewImageInputs((prev) => prev.filter((inputId) => inputId !== id))
  }

  const handleRemoveExistingImage = (publicId: string) => {
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId))
  }

  return (
    <form action={action} className="space-y-8">
      {existingImages.map((img) => (
        <input
          key={img.publicId}
          type="hidden"
          name="keptImages"
          value={img.publicId}
        />
      ))}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={product?.name ?? ""}
        />
        {error?.name && <div className="text-red-500">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="basePrice">Price</Label>
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
      <div className="space-y-2">
        <Label htmlFor="categoryId">Category</Label>
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
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
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
      <div className="space-y-2">
        <Label>Images</Label>
        {existingImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image.url}
                  alt={`Produce Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="h-32 w-full rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 size-6 p-0"
                  onClick={() => handleRemoveExistingImage(image.publicId)}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {newImageInputs.map((id) => (
            <div key={id} className="flex items-center gap-2">
              <Input type="file" name="images" />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveNewImageInput(id)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddImageInput}>
            Add Image
          </Button>

          {error?.images && <div className="text-red-500">{error.images}</div>}
        </div>
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Saving..." : "Submit"}
    </Button>
  )
}
