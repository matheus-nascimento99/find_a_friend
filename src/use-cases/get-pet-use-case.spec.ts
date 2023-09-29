import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'
import { NotFoundError } from './errors/not-found-error'
import { GetPetUseCase } from './get-pet-use-case'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const createPetsUseCase = new CreatePetUseCase(petsRepository)

    await createPetsUseCase.execute({
      organizationId: 'org-01',
      name: 'teste',
      about: 'teste',
      age: 'teste',
      city: 'city-1',
      energyLevel: 'teste',
      independenceLevel: 'teste',
      mien: 'teste',
      photos: [{ url: 'teste' }],
      requirements: [{ requirement: 'teste' }],
    })

    const { pet } = await sut.execute({ petId: 'pet-01' })
    expect(pet).toEqual(expect.objectContaining({ id: 'pet-01' }))
  })

  it('should be able to get no one pets', async () => {
    const createPetsUseCase = new CreatePetUseCase(petsRepository)

    await createPetsUseCase.execute({
      organizationId: 'org-01',
      name: 'teste',
      about: 'teste',
      age: 'teste',
      city: 'city-1',
      energyLevel: 'teste',
      independenceLevel: 'teste',
      mien: 'teste',
      photos: [{ url: 'teste' }],
      requirements: [{ requirement: 'teste' }],
    })

    expect(async () => await sut.execute({ petId: '' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })
})
