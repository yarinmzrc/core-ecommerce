import { notFound } from "next/navigation"

import { PageHeader } from "@/app/admin/_components/page-header"
import { getCategory } from "@/features/categories/dal/queries"

import { CategoryForm } from "../../_components/category-form"

export default async function AdminEditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const category = await getCategory(id)

  if (category == null) return notFound()

  return (
    <>
      <PageHeader>Edit Category</PageHeader>
      <CategoryForm category={category} />
    </>
  )
}
