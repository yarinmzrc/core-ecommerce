import { baseConfig } from "@ecommerce/eslint-config"
import { defineConfig } from "eslint/config"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default defineConfig([
  ...baseConfig,
  {
    files: ["src/app/api/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/server",
              importNames: ["NextResponse"],
              message: "Use ApiResponse.success/error instead of NextResponse",
            },
          ],
        },
      ],
    },
  },
])
