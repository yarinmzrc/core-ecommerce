import { getTranslations } from "next-intl/server"

import { getCategories } from "@/features/categories/dal/queries"
import { getOptionTemplates } from "@/features/option-templates/dal/queries"
import { ProductForm } from "@/features/products/components/product-form/product-form"

import { PageHeader } from "../../../_components/page-header"

export default async function NewProductPage() {
  const t = await getTranslations("admin.products.pages")

  const categories = await getCategories()
  const optionTemplates = await getOptionTemplates()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>{t("create")}</PageHeader>
      <ProductForm categories={categories} optionTemplates={optionTemplates} />
    </div>
  )
}
