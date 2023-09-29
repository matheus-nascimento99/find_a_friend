import { create } from '@/http/controllers/pets/create'
import { fetch } from '@/http/controllers/pets/fetch'
import { get } from '@/http/controllers/pets/get'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/create-pet', { onRequest: [verifyJwt] }, create)
  app.get('/fetch-pets', fetch)
  app.get('/get-pet/:petId', get)
}
