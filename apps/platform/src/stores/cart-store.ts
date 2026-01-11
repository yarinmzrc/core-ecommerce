import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export type CartProduct = {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
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

type CartGetters = {
  getItems: () => CartProduct[]
}

type Store = CartState & CartActions & CartGetters

export const useCartStore = create<Store>()(
  persist(
    immer((set, get) => ({
      // state
      items: [],
      // actions
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
      // getters
      getItems: () => get().items,
    })),
    {
      name: "cart-storage",
    },
  ),
)
