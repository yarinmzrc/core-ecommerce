import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import { Suspense } from "react"
import { prisma } from "../../../../prisma/client"

async function getProducts() {
  return await prisma.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { name: "asc" },
  })
}

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
  const products = await getProducts()
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))
}
