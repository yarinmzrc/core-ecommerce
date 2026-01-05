import type { Meta, StoryObj } from "@storybook/react"

import { ProductCard, ProductCardSkeleton } from "./product-card"

const meta: Meta<typeof ProductCard> = {
  title: "Products/ProductCard",
  component: ProductCard,
  argTypes: {
    id: { control: "text" },
    name: { control: "text" },
    basePrice: { control: "number" },
    description: { control: "text" },
    image: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof ProductCard>

export const Default: Story = {
  args: {
    id: "1",
    name: "Delicious Pizza",
    basePrice: 19.99,
    description: "A really delicious pizza with cheese and tomato sauce.",
    image: "https://via.placeholder.com/400x200",
  },
}

export const Skeleton: Story = {
  render: () => <ProductCardSkeleton />,
}
