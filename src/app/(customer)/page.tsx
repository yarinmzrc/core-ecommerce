import { Button } from "@/components/ui/button"
import { prisma } from "../../../prisma/client"
import { Product } from "../../../prisma/generated/prisma/client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Suspense } from "react"
import { ProductCard, ProductCardSkeleton } from "@/components/product-card"

async function getMostPopularProducts() {
  return await prisma.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { orderItems: { _count: "desc" } },
    take: 6,
  })
}

async function getNewestProducts() {
  return await prisma.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}

export default function HomePage() {
  return (
    <main className="space-y-12">
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
          <Link href="/products">
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
