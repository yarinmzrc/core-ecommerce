import { notFound } from "next/navigation"
import { prisma } from "../../../../../../prisma/client"
import { PageHeader } from "../../../_components/page-header"
import { ProductForm } from "../../_components/product-form"

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })
}

async function getProduct(id: string) {
  return await prisma.product.findUnique({ where: { id } })
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)
  const categories = await getCategories()

  if (product == null) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} categories={categories} />
    </div>
  )
}
