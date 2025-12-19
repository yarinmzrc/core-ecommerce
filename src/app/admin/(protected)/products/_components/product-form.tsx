"use client"

import Image from "next/image"
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
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
import { createProduct } from "@/features/products/server/create-product"
import { updateProduct } from "@/features/products/server/update-product"
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
    product == null ? createProduct : updateProduct.bind(null, product.id),
    {},
  )
  const [price, setPrice] = useState<number | null>(product?.price ?? null)

  return (
    <form action={action} className="space-y-8">
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
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={price ?? ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        {error?.price && <div className="text-red-500">{error.price}</div>}
        <div className="text-muted-foreground">
          {formatCurrency(price ?? 0)}
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
        <Label htmlFor="imagePath">Image</Label>
        <Input
          type="file"
          id="imagePath"
          name="imagePath"
          required={product == null}
        />
        {product?.imagePath && (
          <Image
            src={product.imagePath}
            alt={product.name}
            width={200}
            height={200}
          />
        )}
        {error?.imagePath && (
          <div className="text-red-500">{error.imagePath}</div>
        )}
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
