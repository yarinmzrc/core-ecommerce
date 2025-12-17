import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export type CartProduct = {
  id: string
  name: string
  price: number
  quantity: number
  imagePath: string
}

type CartState = {
  items: CartProduct[]
}

const initialState = {
  items: [],
}

type CartActions = {
  addItem: (product: CartProduct, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

type Store = CartState & CartActions

export const useCartStore = create<Store>()(
  persist(
    immer((set, get) => ({
      items: [],
      addItem: (product: CartProduct, quantity: number = 1) =>
        set((state) => {
          state.items = [...state.items, { ...product, quantity }]
        }),
      removeItem: (productId: string) =>
        set((state) => {
          state.items = state.items.filter((p) => p.id !== productId)
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          state.items = state.items.map((p) =>
            p.id === productId ? { ...p, quantity } : p,
          )
        }),
      clearCart: () => set(initialState),
    })),
    {
      name: "catering-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useCartTotal = () => {
  return useCartStore((s) =>
    s.items.reduce((acc, item) => item.price * item.quantity + acc, 0),
  )
}

export const useCartItemsCount = () => {
  return useCartStore((s) =>
    s.items.reduce((acc, item) => item.quantity + acc, 0),
  )
}
