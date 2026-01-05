import { useShallow } from "zustand/shallow"

import { useCartStore } from "@/stores/cart-store"

export function useCart() {
  return useCartStore(
    useShallow((s) => {
      const items = s.items
      return {
        items,
        addItem: s.addItem,
        removeItem: s.removeItem,
        updateQuantity: s.updateQuantity,
        itemsCount: items.reduce((acc, item) => item.quantity + acc, 0),
        clearCart: s.clearCart,
      }
    }),
  )
}
