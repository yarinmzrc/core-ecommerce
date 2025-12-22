import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { paths } from "@/config/paths"

import { CategoryDTO } from "../dtos"

export function CategoryCard({ category }: { category: CategoryDTO }) {
  return (
    <Link href={paths.app.category.getHref(category.id)} className="block">
      <Card className="group relative h-48 cursor-pointer overflow-hidden rounded-none shadow-none">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${category.imagePath})`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <CardContent className="relative z-10 flex h-full items-center justify-center">
          <h3 className="text-center text-xl font-bold text-white drop-shadow-lg">
            {category.name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}

export function CategoryCardSkeleton() {
  return (
    <Button asChild variant="outline">
      <div className="h-6 animate-pulse rounded-full bg-gray-300"></div>
    </Button>
  )
}
