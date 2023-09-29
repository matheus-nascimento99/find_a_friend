import 'dotenv/config'
import { z } from 'zod'

const envVariablesSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']),
  JWT_SECRET: z.string().min(1),
  PORT: z.coerce.number().default(3333),
})

const _env = envVariablesSchema.parse(process.env)

export const env = _env
