import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { paths } from "@/config/paths"

import { Category } from "../types"

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={paths.app.category.getHref(category.id)} className="block">
      <Card className="group relative h-48 cursor-pointer overflow-hidden rounded-none shadow-none">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dexzucg7a/image/upload/v1766057709/products/x4upbn9zchl06z6jd1rt.jpg)`,
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
