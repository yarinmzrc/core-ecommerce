"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products"
import { useRouter } from "next/navigation"

type ActiveToggleDropdownActionProps = {
  id: string
  isAvailableForSale: boolean
}

export function ActiveToggleDropdownAction({
  id,
  isAvailableForSale,
}: ActiveToggleDropdownActionProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForSale)
          router.refresh()
        })
      }}
    >
      {isAvailableForSale ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}

type DeleteDropdownItemProps = {
  id: string
  disabled?: boolean
}
export function DeleteDropdownItem({ id, disabled }: DeleteDropdownItemProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      <span className="text-red-500">Delete</span>
    </DropdownMenuItem>
  )
}
