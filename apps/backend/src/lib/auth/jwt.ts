"server only"

import { env } from "@/config/env"
import jwt from "jsonwebtoken"

export type JwtPayload = {
  sub: string
  email: string
}

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.AUTH_JWT_SECRET, {
    expiresIn: "1d",
  })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.AUTH_JWT_SECRET) as JwtPayload
}
