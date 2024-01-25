import { z } from 'zod'

const envSchema = z.object({
  COGNITO_CLIENT_ID: z.string(),
  COGNITO_CLIENT_SECRET: z.string(),
  COGNITO_USER_POOL_ID: z.string(),
  DATABASE_URL: z.string().url(),
  DATABASE_DIRECT_URL: z.string().url(),
  REGION: z.string()
})

export const env = envSchema.parse(process.env)
