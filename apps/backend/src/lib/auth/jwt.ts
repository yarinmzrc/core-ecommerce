"server only"

import jwt from "jsonwebtoken"

import { env } from "@/config/env"
import { RoleDTOType } from "@/features/users/dtos"

export type JwtPayload = {
  sub: string
  email: string
  role: RoleDTOType
}

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.AUTH_JWT_SECRET, {
    expiresIn: "1d",
  })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.AUTH_JWT_SECRET) as JwtPayload
}
