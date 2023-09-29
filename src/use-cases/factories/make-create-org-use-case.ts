import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org-use-case'

export const makeCreateOrgsUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository()
  const createOrgsUseCase = new CreateOrgUseCase(orgsRepository)

  return createOrgsUseCase
}
