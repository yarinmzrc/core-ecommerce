import { z } from "zod"

import { AppType } from "./app"

const createEnv = () => {
  const EnvSchema = z.object({
    APP_NAME: z.string(),
    APP_TYPE: z.enum(Object.values(AppType)),
    DATABASE_URL: z.string(),
    ADMIN_USERNAME: z.string(),
    HASHED_ADMIN_PASSWORD: z.string(),
    SERVER_URL: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    ADMIN_PASSWORD: z.string().optional(),
    TWILIO_ACCOUNT_SID: z.string(),
    TWILIO_AUTH_TOKEN: z.string(),
  })

  const envVars = {
    APP_NAME: process.env.APP_NAME,
    APP_TYPE: process.env.APP_TYPE,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    HASHED_ADMIN_PASSWORD: process.env.HASHED_ADMIN_PASSWORD,
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
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
