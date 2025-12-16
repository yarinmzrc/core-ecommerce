import { Button } from "@/components/ui/button"
import { Category, Product } from "../../../prisma/generated/prisma/client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Suspense } from "react"
import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import { paths } from "@/config/paths"
import { getMostPopularProducts } from "@/features/products/server/get-most-popular-products"
import { getNewestProducts } from "@/features/products/server/get-newest-products"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories } from "@/features/categories/server/get-categories"

export default function HomePage() {
  return (
    <main className="space-y-12">
      <CategoriesGridSection />
      <ProductsGridSection
        title="Most Popular"
        fetcher={getMostPopularProducts}
      />
      <ProductsGridSection title="Newest" fetcher={getNewestProducts} />
    </main>
  )
}

type ProductsGridSectionProps = {
  fetcher: () => Promise<Product[]>
  title: string
}

function ProductsGridSection({ fetcher, title }: ProductsGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Button asChild variant="outline">
          <Link href={paths.app.products.root.getHref()}>
            <span>View all</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense fetcher={fetcher} />
        </Suspense>
      </div>
    </div>
  )
}
type ProductsSuspenseProps = {
  fetcher: () => Promise<Product[]>
}
async function ProductsSuspense({ fetcher }: ProductsSuspenseProps) {
  return (await fetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ))
}

function CategoriesGridSection() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h3 className="text-2xl font-semibold">Categories</h3>
        <Button asChild variant="outline">
          <Link href={paths.app.categories.getHref()}>
            <span>View all</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
            </>
          }
        >
          <CategoriesSuspense />
        </Suspense>
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          <Button asChild variant="outline">
            <Link href={paths.app.category.getHref(category.id)}>
              <span>{category.name}</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

async function CategoriesSuspense() {
  const categories = await getCategories()

  return categories.map((category) => (
    <CategoryCard key={category.id} category={category} />
  ))
}

function CategoryCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          <div className="h-6 animate-pulse rounded-full bg-gray-300"></div>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
