import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

import { BaseGrid } from "@/components/base-grid"
import { Button } from "@/components/ui/button"
import { paths } from "@/config/paths"

import { getCategories } from "../dal/queries"
import { CategoryCard, CategoryCardSkeleton } from "./category-card"

export function CategoriesGrid() {
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
      <BaseGrid>
        <Suspense fallback={getCategoriesSkeletons()}>
          <CategoriesSuspense />
        </Suspense>
      </BaseGrid>
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
