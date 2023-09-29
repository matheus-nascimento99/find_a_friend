import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets-use-case'

export const makeFetchPetsUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsUseCase = new FetchPetsUseCase(petsRepository)

  return fetchPetsUseCase
}
