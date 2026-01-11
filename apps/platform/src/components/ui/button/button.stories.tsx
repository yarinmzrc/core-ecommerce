import type { Meta, StoryObj } from "@storybook/react"
import { Plus } from "lucide-react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "default",
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <Plus />
        Add item
      </Button>

      <Button size="icon" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
}

export const AsChildLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#">Button as link</a>
    </Button>
  ),
}

export const FocusVisible: Story = {
  args: {
    children: "Tab to focus me",
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
}
