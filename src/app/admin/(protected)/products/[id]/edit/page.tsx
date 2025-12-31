import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { getCategories } from "@/features/categories/dal/queries"
import { getOptionTemplates } from "@/features/option-templates/dal/queries"
import { ProductForm } from "@/features/products/components/product-form/product-form"
import { getFullProduct } from "@/features/products/dal/queries"

import { PageHeader } from "../../../../_components/page-header"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const t = await getTranslations("admin.products.pages")

  const { id } = await params

  const [product, categories, optionTemplates] = await Promise.all([
    getFullProduct(id),
    getCategories(),
    getOptionTemplates(),
  ])

  if (product == null) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>{t("edit")}</PageHeader>
      <ProductForm
        optionTemplates={optionTemplates}
        product={product}
        categories={categories}
      />
    </div>
  )
}
