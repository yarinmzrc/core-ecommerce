"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button/button"
import { useCart } from "@/core/cart/hooks/use-cart"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card"
import { ImageDTO } from "../../dtos"

type ProductCardProps = {
  id: string
  name: string
  basePrice: number
  description: string
  image: string
}

export function ProductCard({
  id,
  name,
  basePrice,
  description,
  image,
}: ProductCardProps) {
  const t = useTranslations()

  const { items, updateQuantity, addItem } = useCart()
  const cartItem = items.find((i) => i.id === id)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1)
    } else {
      addItem({
        id,
        name,
        price: basePrice,
        imageUrl: image,
        quantity: 0,
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success(t("product.addedToBasket"))
    setIsAdding(false)
  }

  return (
    <Card className="flex max-w-sm flex-col overflow-hidden pt-0">
      <div className="relative aspect-video h-auto w-full">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(basePrice)}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          className={cn("w-full", {
            "pointer-events-none opacity-50": isAdding,
          })}
          onClick={handleAddToCart}
        >
          {isAdding ? t("buttons.addingToBusket") : t("buttons.addToBusket")}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex max-w-sm flex-col overflow-hidden pt-0">
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
