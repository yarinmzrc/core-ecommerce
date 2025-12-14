import { formatCurrency } from "@/lib/format"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import { paths } from "@/config/paths"

type ProductCardProps = {
  id: string
  name: string
  price: number
  description: string
  imagePath: string
}

export function ProductCard({
  id,
  name,
  price,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div className="relative aspect-video h-auto w-full">
        <Image fill src={imagePath} alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(price)}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={paths.app.products.purchase.getHref(id)}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div className="bg-muted relative aspect-video h-auto w-full animate-pulse" />
      <CardHeader>
        <CardTitle className="h-6 w-3/4 animate-pulse rounded-full bg-gray-300" />
        <CardDescription className="h-4 w-1/2 animate-pulse rounded-full bg-gray-300" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
        <div className="h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-300"></div>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <span className="h-6 animate-pulse" />
        </Button>
      </CardFooter>
    </Card>
  )
}
