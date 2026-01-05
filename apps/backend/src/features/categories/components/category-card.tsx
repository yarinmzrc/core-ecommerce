import Link from "next/link"

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
            backgroundImage: `url(${category.imageUrl})`,
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
    <Card className="group relative h-48 cursor-pointer overflow-hidden rounded-none p-0 shadow-none">
      <CardContent className="relative z-10 flex h-full animate-pulse items-center justify-center bg-gray-200"></CardContent>
    </Card>
  )
}
