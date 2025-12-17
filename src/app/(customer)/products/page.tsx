import { getProductsForStore } from "@/features/products"
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/features/products/components/product-card"
import { Suspense } from "react"

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  )
}

async function ProductsSuspense() {
  const products = await getProductsForStore()

  if (products.length === 0) return <p>No products found</p>

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))
}
