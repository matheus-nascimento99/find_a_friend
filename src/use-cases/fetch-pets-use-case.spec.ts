import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets-use-case'
import { CreatePetUseCase } from './create-pet-use-case'
import { NotFoundError } from './errors/not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch pets use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
  })

  it('should be able to fetch pets', async () => {
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

    await createPetsUseCase.execute({
      organizationId: 'org-01',
      name: 'teste',
      about: 'teste',
      age: 'teste',
      city: 'city-2',
      energyLevel: 'teste',
      independenceLevel: 'teste',
      mien: 'teste',
      photos: [{ url: 'teste' }],
      requirements: [{ requirement: 'teste' }],
    })

    const { pets } = await sut.execute({
      city: 'city-1',
      age: null,
      energyLevel: null,
      independenceLevel: null,
      mien: null,
    })

    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ city: 'city-1' })]),
    )
  })

  it('should be able to fetch pets filtered', async () => {
    const createPetsUseCase = new CreatePetUseCase(petsRepository)

    await createPetsUseCase.execute({
      organizationId: 'org-01',
      name: 'name-01',
      about: 'about-01',
      age: 'age-01',
      city: 'city-01',
      energyLevel: 'energy-level-01',
      independenceLevel: 'independence-level-01',
      mien: 'mien-01',
      photos: [{ url: 'url-01' }],
      requirements: [{ requirement: 'requirement-01' }],
    })

    await createPetsUseCase.execute({
      organizationId: 'org-02',
      name: 'name-02',
      about: 'about-02',
      age: 'age-02',
      city: 'city-02',
      energyLevel: 'energy-level-02',
      independenceLevel: 'independence-level-02',
      mien: 'mien-02',
      photos: [{ url: 'url-02' }],
      requirements: [{ requirement: 'requirement-02' }],
    })

    const { pets } = await sut.execute({
      city: 'city-01',
      age: 'age-01',
      energyLevel: 'energy-level-01',
      mien: 'mien-01',
      independenceLevel: 'independence-level-01',
    })

    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ city: 'city-01' })]),
    )
  })

  it('should be able to fetch no one pets', async () => {
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

    await createPetsUseCase.execute({
      organizationId: 'org-01',
      name: 'teste',
      about: 'teste',
      age: 'teste',
      city: 'city-2',
      energyLevel: 'teste',
      independenceLevel: 'teste',
      mien: 'teste',
      photos: [{ url: 'teste' }],
      requirements: [{ requirement: 'teste' }],
    })

    expect(
      async () =>
        await sut.execute({
          city: 'city-3',
          age: null,
          energyLevel: null,
          independenceLevel: null,
          mien: null,
        }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})
