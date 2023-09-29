import { NotFoundError } from '@/use-cases/errors/not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const schema = z.object({
    petId: z.string().min(1),
  })

  const { petId } = schema.parse(request.params)

  try {
    const useCase = makeGetPetUseCase()
    const { pet } = await useCase.execute({ petId })
    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send()
    }

    throw error
  }
}
