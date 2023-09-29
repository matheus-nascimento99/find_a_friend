import { NotFoundError } from '@/use-cases/errors/not-found-error'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const fetch = async (request: FastifyRequest, reply: FastifyReply) => {
  const schema = z.object({
    city: z.string().min(1),
    age: z.string().nullable(),
    energyLevel: z.string().nullable(),
    mien: z.string().nullable(),
    independenceLevel: z.string().nullable(),
  })

  const { city, age, energyLevel, independenceLevel, mien } = schema.parse(
    request.query,
  )

  try {
    const useCase = makeFetchPetsUseCase()
    const { pets } = await useCase.execute({
      city,
      age,
      energyLevel,
      independenceLevel,
      mien,
    })
    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send()
    }

    throw error
  }
}
