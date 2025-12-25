import { getCategories } from "@/features/categories/dal/queries"
import { ProductForm } from "@/features/products/components/product-form/product-form"

import { PageHeader } from "../../../_components/page-header"

export default async function NewProductPage() {
  const categories = await getCategories()
  return (
    <div className="flex flex-col gap-4">
      <PageHeader>New Product</PageHeader>
      <ProductForm categories={categories} />
    </div>
  )
}
