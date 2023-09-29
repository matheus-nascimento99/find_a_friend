import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'

export type CreatePetUseCaseRequest = {
  organizationId: string
  name: string
  about: string
  age: string
  mien: string
  energyLevel: string
  independenceLevel: string
  city: string
  photos: { url: string }[]
  requirements: { requirement: string }[]
}
export type CreatePetUseCaseResponse = {
  pet: Pet | Prisma.PetUncheckedCreateInput
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationId,
    name,
    about,
    mien,
    energyLevel,
    independenceLevel,
    age,
    city,
    photos,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      organizationId,
      name,
      about,
      mien,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      age,
      city,
      photos,
      requirements,
      created_at: new Date(),
    })

    return {
      pet,
    }
  }
}
