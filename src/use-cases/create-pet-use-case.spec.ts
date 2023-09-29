import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      organizationId: 'org-01',
      name: 'teste',
      about: 'teste',
      age: 'teste',
      city: 'teste',
      energyLevel: 'teste',
      independenceLevel: 'teste',
      mien: 'teste',
      photos: [{ url: 'teste' }],
      requirements: [{ requirement: 'teste' }],
    })

    expect(pet).toEqual(expect.objectContaining({ id: 'pet-01' }))
  })
})
