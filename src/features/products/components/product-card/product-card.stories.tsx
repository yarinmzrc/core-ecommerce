// components/product-card/product-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"

import { ProductCard, ProductCardSkeleton } from "./product-card"

// Mock implementations
const mockCart = {
  items: [],
  addItem: () => console.log("addItem called"),
  updateQuantity: () => console.log("updateQuantity called"),
}

const mockT = (key: string) => {
  const map: Record<string, string> = {
    "product.addedToBasket": "Added to basket!",
    "buttons.addingToBusket": "Adding...",
    "buttons.addToBusket": "Add to basket",
  }
  return map[key] ?? key
}

const meta: Meta<typeof ProductCard> = {
  title: "Products/ProductCard",
  component: ProductCard,
  argTypes: {
    id: { control: "text" },
    name: { control: "text" },
    price: { control: "number" },
    description: { control: "text" },
    imagePath: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof ProductCard>

export const Default: Story = {
  args: {
    id: "1",
    name: "Delicious Pizza",
    price: 19.99,
    description: "A really delicious pizza with cheese and tomato sauce.",
    imagePath: "https://via.placeholder.com/400x200",
  },
}

export const Skeleton: Story = {
  render: () => <ProductCardSkeleton />,
}
