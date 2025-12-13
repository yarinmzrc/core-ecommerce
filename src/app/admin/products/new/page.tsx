import { prisma } from "../../../../../prisma/client"
import { PageHeader } from "../../_components/page-header"
import { ProductForm } from "../_components/product-form"

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })
}

export default async function NewProductPage() {
  const categories = await getCategories()
  return (
    <div className="flex flex-col gap-4">
      <PageHeader>New Product</PageHeader>
      <ProductForm categories={categories} />
    </div>
  )
}
