import { makeCreateOrgsUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const schema = z.object({
    cellphone: z.string().min(1),
    postalCode: z.string().min(1),
    email: z.string().email().min(1),
    passwordHash: z.string().min(1),
    sponsor: z.string().min(1),
    street: z.string().min(1),
  })

  const { cellphone, email, passwordHash, postalCode, sponsor, street } =
    schema.parse(request.body)

  const createOrgUseCase = makeCreateOrgsUseCase()
  const { org } = await createOrgUseCase.execute({
    cellphone,
    email,
    passwordHash,
    postalCode,
    sponsor,
    street,
  })

  return reply.status(201).send({ org })
}
