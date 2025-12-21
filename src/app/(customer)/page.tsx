import { CategoriesGrid } from "@/features/categories/components/categories-grid"
import { ProductsGrid } from "@/features/products/components/products-grid"
import {
  getMostPopularProducts,
  getNewestProducts,
} from "@/features/products/dal/queries"

export default function HomePage() {
  return (
    <main className="space-y-12">
      <CategoriesGrid />
      <ProductsGrid title="Most Popular" fetcher={getMostPopularProducts} />
      <ProductsGrid title="Newest" fetcher={getNewestProducts} />
    </main>
  )
}
