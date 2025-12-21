import Link from "next/link"

import { Button } from "@/components/ui/button"
import { paths } from "@/config/paths"
import { ProductsTable } from "@/features/products/components/products-table"
import { getProductsForAdmin } from "@/features/products/dal/queries"

import { PageHeader } from "../../_components/page-header"

export default async function AdminProductsPage() {
  const products = await getProductsForAdmin()

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href={paths.admin.products.new.getHref()}>Add Product</Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </>
  )
}
