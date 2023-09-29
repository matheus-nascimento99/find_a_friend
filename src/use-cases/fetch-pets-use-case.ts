import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { NotFoundError } from './errors/not-found-error'

export type FetchPetsUseCaseRequest = {
  city: string
  age: string | null
  energyLevel: string | null
  mien: string | null
  independenceLevel: string | null
}
export type FetchPetsUseCaseResponse = {
  pets: Prisma.PetUncheckedCreateInput[] | Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energyLevel,
    independenceLevel,
    mien,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany(
      city,
      age,
      energyLevel,
      mien,
      independenceLevel,
    )

    if (pets.length === 0) {
      throw new NotFoundError()
    }

    return {
      pets,
    }
  }
}
