const AppTypes = {
  FOOD: "FOOD",
  FASHION: "FASHION",
  CATERING: "CATERING",
} as const

const Roles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  STORE_ADMIN: "STORE_ADMIN",
  USER: "USER",
}

type Role = keyof typeof Roles

export { AppTypes, Roles, type Role }
