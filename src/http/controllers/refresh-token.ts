import { FastifyRequest, FastifyReply } from 'fastify'

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    .status(200)
    .send({ token })
}
