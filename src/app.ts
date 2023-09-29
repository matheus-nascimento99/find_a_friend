import { env } from './env'

import { ZodError } from 'zod'

import Fastify from 'fastify'

import { fastifyJwt } from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { orgsRoutes } from './routes/orgs'
import { petsRoutes } from './routes/pets'
import { authRoutes } from './routes/auth'

const app = Fastify({
  logger: env.NODE_ENV === 'dev',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(authRoutes)
app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler(function (error, _, reply) {
  if (error instanceof ZodError) {
    // TODO: Log error

    // Send error response
    return reply.status(400).send({ error, issues: error.format() })
  }

  if (env.NODE_ENV === 'dev') {
    console.error(error)
  } else {
    // TODO: Log error
  }

  return reply.status(500).send(error)
})

export default app
