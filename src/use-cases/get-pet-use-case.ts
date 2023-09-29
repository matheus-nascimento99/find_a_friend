import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { NotFoundError } from './errors/not-found-error'

export type GetPetUseCaseRequest = {
  petId: string
}
export type GetPetUseCaseResponse = {
  pet: Prisma.PetUncheckedCreateInput | Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (pet === null) {
      throw new NotFoundError()
    }

    return {
      pet,
    }
  }
}
