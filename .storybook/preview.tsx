import "../src/app/globals.css"

import type { Preview } from "@storybook/nextjs-vite"
import { NextIntlClientProvider } from "next-intl"

import defaultMessages from "../messages/he.json"

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider messages={defaultMessages} locale="he">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview
