export const RoleDTO = {
  SUPER_ADMIN: "SUPER_ADMIN",
  STORE_ADMIN: "STORE_ADMIN",
  USER: "USER",
}

export type RoleDTOType = keyof typeof RoleDTO
