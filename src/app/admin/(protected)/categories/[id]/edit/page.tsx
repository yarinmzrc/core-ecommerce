import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { PageHeader } from "@/app/admin/_components/page-header"
import { getCategory } from "@/features/categories/dal/queries"

import { CategoryForm } from "../../_components/category-form"

export default async function AdminEditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const t = await getTranslations("admin.products.pages")

  const id = (await params).id
  const category = await getCategory(id)

  if (category == null) return notFound()

  return (
    <div className="flex flex-col gap-12">
      <PageHeader>{t("edit")}</PageHeader>
      <CategoryForm category={category} />
    </div>
  )
}
