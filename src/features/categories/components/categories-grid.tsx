import Link from "next/link"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { paths } from "@/config/paths"

import { getCategories } from "../dal/queries"
import { CategoryCard, CategoryCardSkeleton } from "./category-card"

export function CategoriesGrid() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Suspense fallback={getCategoriesSkeletons()}>
          <CategoriesSuspense />
        </Suspense>
      </div>
      <div className="text-center">
        <Button asChild>
          <Link href={paths.app.products.root.getHref()}>
            <span>לכל המוצרים לחץ כאן</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

async function CategoriesSuspense() {
  const categories = await getCategories()

  return categories.map((category) => (
    <CategoryCard key={category.id} category={category} />
  ))
}

function getCategoriesSkeletons() {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </>
  )
}
