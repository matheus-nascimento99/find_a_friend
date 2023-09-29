import { authenticate } from '@/http/controllers/authenticate'
import { refreshToken } from '@/http/controllers/refresh-token'
import { FastifyInstance } from 'fastify'

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/session', authenticate)
  app.patch('/token/refresh', refreshToken)
}
