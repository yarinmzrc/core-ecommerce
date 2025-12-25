import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button/button"
import { paths } from "@/config/paths"
import { ProductsTable } from "@/features/products/components/products-table"
import { getProductsForAdmin } from "@/features/products/dal/queries"

import { PageHeader } from "../../_components/page-header"

export default async function AdminProductsPage() {
  const t = await getTranslations("admin.products")

  const products = await getProductsForAdmin()

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>{t("title")}</PageHeader>
        <Button asChild>
          <Link href={paths.admin.products.new.getHref()}>
            {t("actions.add")}
          </Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </>
  )
}
