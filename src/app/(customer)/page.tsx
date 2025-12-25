import { getTranslations } from "next-intl/server"

import { CategoriesGrid } from "@/features/categories/components/categories-grid"
import { ProductsGrid } from "@/features/products/components/products-grid"
import {
  getMostPopularProducts,
  getNewestProducts,
} from "@/features/products/dal/queries"

export default async function HomePage() {
  const t = await getTranslations("pages.home")

  return (
    <main className="flex flex-col gap-12 py-12">
      <CategoriesGrid />
      <ProductsGrid title={t("popular")} fetcher={getMostPopularProducts} />
      <ProductsGrid title={t("new")} fetcher={getNewestProducts} />
    </main>
  )
}
