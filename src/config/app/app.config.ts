import { AppType } from "./app-type.config"

export const appConfig = {
  name: "FoodApp",
  description: "A food ordering app",
  logo: "https://via.placeholder.com/400x200",
  type: AppType.FOOD,
} as const
