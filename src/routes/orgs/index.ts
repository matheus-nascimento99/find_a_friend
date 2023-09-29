import { create } from '@/http/controllers/orgs/create'
import { FastifyInstance } from 'fastify'

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post('/create-org', create)
}
