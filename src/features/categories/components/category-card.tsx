import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Category } from "../../../../prisma/generated/prisma/client"
import { paths } from "@/config/paths"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          <Button asChild variant="outline">
            <Link href={paths.app.category.getHref(category.id)}>
              {category.name}
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export function CategoryCardSkeleton() {
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
