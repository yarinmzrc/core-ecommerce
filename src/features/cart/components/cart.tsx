"use client"

import { ShoppingCartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCartItemsCount } from "@/stores/cart-store"

export function Cart() {
  const itemsCount = useCartItemsCount()

  return (
    <Button className="relative rounded-full border">
      <ShoppingCartIcon />
      <div className="absolute -top-1 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
        <span className="text-xs">{itemsCount}</span>
      </div>
    </Button>
  )
}
