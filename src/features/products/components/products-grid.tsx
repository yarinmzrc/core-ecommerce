import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { Button } from "@/components/ui/button/button"
import { paths } from "@/config/paths"

import { ProductDTO } from "../dtos"
import { ProductCard, ProductCardSkeleton } from "./product-card/product-card"

type ProductsGridSectionProps = {
  fetcher: () => Promise<ProductDTO[]>
  title: string
}

export async function ProductsGrid({
  fetcher,
  title,
}: ProductsGridSectionProps) {
  const t = await getTranslations("buttons")
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Button asChild variant="outline">
          <Link href={paths.app.products.root.getHref()}>
            <span>{t("showAll")}</span>
            <ArrowLeft className="size-4" />
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
  fetcher: () => Promise<ProductDTO[]>
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
