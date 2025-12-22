import Link from "next/link"

import { Button } from "@/components/ui/button"
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
import { Category } from "@/features/categories/dtos"

import { PageHeader } from "../../_components/page-header"

export default async function AdminCategoriesPage() {
  const categories = await getCategories()
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>Categories</PageHeader>
        <Button asChild>
          <Link href={paths.admin.categories.new.getHref()}>Add Category</Link>
        </Button>
      </div>
      <CategoriesTable categories={categories} />
    </>
  )
}

type CategoriesTableProps = {
  categories: Category[]
}

function CategoriesTable({ categories }: CategoriesTableProps) {
  if (categories.length === 0) {
    return <p>No categories found</p>
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
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
                  Edit
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
