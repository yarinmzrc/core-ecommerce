import { env } from "@ecommerce/config"
import type { AppTypeType } from "./app-type.config"
import { appTypeConfigMap } from "./option-templates"

export const appConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: "A food ordering app",
  logo: "https://via.placeholder.com/400x200",
  type: env.NEXT_PUBLIC_APP_NAME as AppTypeType,
} as const

export function getAppData() {
  const typeConfig = appTypeConfigMap[appConfig.type]
  return {
    appConfig,
    ...typeConfig,
  }
}

export type AppData = ReturnType<typeof getAppData>
