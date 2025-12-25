"use client"

import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Activity, useState } from "react"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CheckoutForm } from "@/features/orders/components/checkout-form"
import { formatCurrency } from "@/lib/format"
import { CartProduct } from "@/stores/cart-store"

import { useCart } from "../hooks/use-cart"

const CartStep = {
  Items: "Items",
  Checkout: "Checkout",
}

function CartEmptyState() {
  const t = useTranslations("cart")
  return (
    <div className="flex items-center border-y p-4">
      <ShoppingCartIcon size={16} className="ml-2" />{" "}
      <span>{t("emptyState")}</span>
    </div>
  )
}

function CartItem({ item }: { item: CartProduct }) {
  const { removeItem, updateQuantity } = useCart()

  const increment = () => updateQuantity(item.id, item.quantity + 1)

  const decrement = () =>
    item.quantity === 1
      ? removeItem(item.id)
      : updateQuantity(item.id, item.quantity - 1)

  return (
    <div key={item.id} className="flex items-center gap-2 border-b p-4">
      <Image src={item.imageUrl} alt={item.name} width={40} height={40} />

      <div className="flex flex-col gap-2">
        <p className="font-bold">{item.name}</p>
        <p className="text-secondary-foreground text-sm">
          {formatCurrency(item.price * item.quantity)}
        </p>

        <div className="flex items-center gap-2">
          <Button size="sm" className="p-1" onClick={decrement}>
            <MinusIcon className="text-xs" />
          </Button>
          <span>{item.quantity}</span>
          <Button size="sm" className="p-1" onClick={increment}>
            <PlusIcon className="text-xs" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function CartItems({ onCheckout }: { onCheckout: () => void }) {
  const { items } = useCart()

  return (
    <>
      <ScrollArea className="h-full overflow-hidden">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ScrollArea>
      <SheetFooter>
        <Button className="w-full" onClick={onCheckout}>
          להשלמת הזמנה
        </Button>
      </SheetFooter>
    </>
  )
}

function CartTrigger({ itemsCount }: { itemsCount: number }) {
  return (
    <div className="relative cursor-pointer rounded-full p-2">
      <ShoppingBagIcon size={20} />
      <div className="bg-primary absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full">
        <span className="text-primary-foreground text-[8px]">{itemsCount}</span>
      </div>
    </div>
  )
}

function CartStepContent({
  step,
  onCheckout,
}: {
  step: string
  onCheckout: () => void
}) {
  return (
    <>
      <Activity mode={step === CartStep.Items ? "visible" : "hidden"}>
        <CartItems onCheckout={onCheckout} />
      </Activity>
      <Activity mode={step === CartStep.Checkout ? "visible" : "hidden"}>
        <CheckoutForm />
      </Activity>
    </>
  )
}

export function CartSheet() {
  const t = useTranslations("cart")

  const { itemsCount } = useCart()
  const [step, setStep] = useState(CartStep.Items)

  const goToCheckout = () => setStep(CartStep.Checkout)

  return (
    <Sheet>
      <SheetTrigger>
        <CartTrigger itemsCount={itemsCount} />
      </SheetTrigger>
      <SheetContent side="left" className="gap-0">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center">
              {step === CartStep.Checkout && (
                <Button
                  onClick={() => setStep(CartStep.Items)}
                  className="mr-2"
                >
                  <ArrowLeftIcon />
                </Button>
              )}
              <span>{t("title")}</span>
            </div>
          </SheetTitle>
          <SheetDescription>{t("subtitle")}</SheetDescription>
        </SheetHeader>
        {itemsCount === 0 ? (
          <CartEmptyState />
        ) : (
          <CartStepContent step={step} onCheckout={goToCheckout} />
        )}
      </SheetContent>
    </Sheet>
  )
}
