import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { paths } from "@/config/paths"
import { getCategories } from "@/features/categories/dal/queries"
import { CategoryDTO } from "@/features/categories/dtos"

import { PageHeader } from "../../_components/page-header"

export default async function AdminCategoriesPage() {
  const t = await getTranslations("admin.categories")

  const categories = await getCategories()
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>{t("title")}</PageHeader>
        <Button asChild>
          <Link href={paths.admin.categories.new.getHref()}>
            {t("pages.create")}
          </Link>
        </Button>
      </div>
      <CategoriesTable categories={categories} />
    </>
  )
}

type CategoriesTableProps = {
  categories: CategoryDTO[]
}

async function CategoriesTable({ categories }: CategoriesTableProps) {
  const categoryT = await getTranslations("admin.categories")
  const emptyT = await getTranslations("common")

  if (categories.length === 0) {
    return <p>{emptyT("empty.categories")}</p>
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{categoryT("table.columns.name")}</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">
              {categoryT("table.columns.actions")}
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              <Button asChild>
                <Link href={paths.admin.categories.edit.getHref(category.id)}>
                  {categoryT("actions.edit")}
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
