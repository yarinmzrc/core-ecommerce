import { notFound } from "next/navigation"

import { getCategories } from "@/features/categories/dal/queries"
import { getProduct } from "@/features/products/dal/queries"

import { PageHeader } from "../../../../_components/page-header"
import { ProductForm } from "../../_components/product-form"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)
  const categories = await getCategories()

  if (product == null) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} categories={categories} />
    </div>
  )
}
