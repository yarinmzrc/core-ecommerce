import { getCategories } from "@/features/categories/dal/queries"

import { PageHeader } from "../../../_components/page-header"
import { ProductForm } from "../_components/product-form"

export default async function NewProductPage() {
  const categories = await getCategories()
  return (
    <div className="flex flex-col gap-4">
      <PageHeader>New Product</PageHeader>
      <ProductForm categories={categories} />
    </div>
  )
}
