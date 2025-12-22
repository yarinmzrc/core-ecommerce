import { CategoriesGrid } from "@/features/categories/components/categories-grid"
import { ProductsGrid } from "@/features/products/components/products-grid"
import {
  getMostPopularProducts,
  getNewestProducts,
} from "@/features/products/dal/queries"

export default function HomePage() {
  return (
    <main className="flex flex-col gap-12 py-12">
      <CategoriesGrid />
      <ProductsGrid title="הפופולרים ביותר" fetcher={getMostPopularProducts} />
      <ProductsGrid title="החדשים ביותר" fetcher={getNewestProducts} />
    </main>
  )
}
