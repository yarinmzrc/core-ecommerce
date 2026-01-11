"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SheetFooter } from "@/components/ui/sheet"
import { paths } from "@/config/paths"
import { useCartStore } from "@/stores/cart-store"

import { createOrderAction } from "../actions/create-order"

export function CheckoutForm() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [data, action, isPending] = useActionState(
    createOrderAction.bind(null, items),
    null,
  )

  useEffect(() => {
    if (data?.success) {
      router.push(paths.app.purchaseSuccess.getHref())
      clearCart()
    }
  }, [data, clearCart, router])

  return (
    <form action={action}>
      <div className="space-y-8 p-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" required />
          {data?.error?.email && (
            <div className="text-red-500">{data?.error.email}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
          {data?.error?.name && (
            <div className="text-red-500">{data?.error.name}</div>
          )}
        </div>
      </div>
      <SheetFooter>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Placing order..." : "Place order"}
        </Button>
      </SheetFooter>
    </form>
  )
}
