import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const schema = z.object({
    name: z.string().min(1),
    age: z.string().min(1),
    about: z.string().min(1),
    mien: z.string().min(1),
    energyLevel: z.string().min(1),
    independenceLevel: z.string().min(1),
    city: z.string().min(1),
    photos: z.object({ url: z.string().min(1) }).array(),
    requirements: z.object({ requirement: z.string().min(1) }).array(),
  })

  const {
    about,
    city,
    energyLevel,
    age,
    independenceLevel,
    mien,
    name,
    photos,
    requirements,
  } = schema.parse(request.body)

  const useCase = makeCreatePetUseCase()

  const { pet } = await useCase.execute({
    about,
    age,
    city,
    mien,
    name,
    photos,
    requirements,
    energyLevel,
    independenceLevel,
    organizationId: request.user.sub,
  })

  return reply.status(201).send({ pet })
}
