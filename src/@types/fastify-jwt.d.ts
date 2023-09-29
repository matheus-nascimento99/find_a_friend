import '@fastify/jwt'
import { UUID } from 'crypto'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: UUID
    } // user type is return type of `request.user` object
  }
}
