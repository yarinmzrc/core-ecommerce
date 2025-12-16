import { Button } from "@/components/ui/button"
import { Product } from "../../../../prisma/generated/prisma/client"
import { ArrowRight } from "lucide-react"
import { paths } from "@/config/paths"
import { Suspense } from "react"
import { ProductCard, ProductCardSkeleton } from "./product-card"
import Link from "next/link"

type ProductsGridSectionProps = {
  fetcher: () => Promise<Product[]>
  title: string
}

export function ProductsGrid({ fetcher, title }: ProductsGridSectionProps) {
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
        <Suspense fallback={getProductsSkeletons()}>
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

function getProductsSkeletons() {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  )
}
