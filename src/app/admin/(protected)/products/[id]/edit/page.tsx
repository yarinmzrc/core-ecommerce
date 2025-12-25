import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { getCategories } from "@/features/categories/dal/queries"
import { ProductForm } from "@/features/products/components/product-form/product-form"
import { getProduct } from "@/features/products/dal/queries"

import { PageHeader } from "../../../../_components/page-header"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const t = await getTranslations("admin.products.pages")

  const { id } = await params
  const product = await getProduct(id)
  const categories = await getCategories()

  if (product == null) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>{t("edit")}</PageHeader>
      <ProductForm product={product} categories={categories} />
    </div>
  )
}
