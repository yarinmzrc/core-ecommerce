import { Button } from "@/components/ui/button"
import { paths } from "@/config/paths"
import { ArrowRight } from "lucide-react"
import { Suspense } from "react"
import { CategoryCard, CategoryCardSkeleton } from "./category-card"
import { getCategories } from "../server/get-categories"
import { BaseGrid } from "@/components/base-grid"
import Link from "next/link"

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
