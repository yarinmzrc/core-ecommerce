"use client"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/hooks/use-cart"
import { formatCurrency } from "@/lib/format"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

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
  const { items, updateQuantity, addItem } = useCart()

  const cartItem = items.find((i) => i.id === id)

  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div className="relative aspect-video h-auto w-full">
        <Image src={imagePath} alt={name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(price)}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          size="lg"
          className="w-full"
          onClick={() =>
            cartItem
              ? updateQuantity(cartItem.id, cartItem.quantity + 1)
              : addItem({ id, name, price, imagePath, quantity: 0 })
          }
        >
          Add To Cart
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
