import { AuthenticationError } from '@/use-cases/errors/authentication-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const schema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  })

  const { email, password } = schema.parse(request.body)

  try {
    const useCase = makeAuthenticateUseCase()
    const { org } = await useCase.axecute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ org: { ...org, passwordHash: undefined }, token })
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return reply.status(400).send()
    }

    throw error
  }
}
