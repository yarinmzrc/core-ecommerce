import { z } from "zod"
import "dotenv/config"

const createEnv = () => {
  const EnvSchema = z.object({
    DATABASE_URL: z.string(),
    ADMIN_USERNAME: z.string(),
    HASHED_ADMIN_PASSWORD: z.string(),
    SERVER_URL: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_PUBLIC_KEY: z.string(),
  })

  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    HASHED_ADMIN_PASSWORD: process.env.HASHED_ADMIN_PASSWORD,
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  }

  const parsedEnv = EnvSchema.safeParse(envVars)

  if (parsedEnv.success === false) {
    throw new Error(
      `Invalid env provided.
        The following variables are missing or invalid:
        ${Object.entries(z.flattenError(parsedEnv.error).fieldErrors)
          .map(([key, value]) => `- ${key}: ${value}`)
          .join("\n")}`,
    )
  }

  return parsedEnv.data ?? {}
}

export const env = createEnv()
