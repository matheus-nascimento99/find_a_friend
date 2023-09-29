import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from '@prisma/client'
import * as bcrypt from 'bcrypt'

export type CreateOrgUseCaseRequest = {
  cellphone: string
  postalCode: string
  email: string
  passwordHash: string
  sponsor: string
  street: string
}

export type CreateOrgUseCaseResponse = {
  org: Organization
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    cellphone,
    email,
    passwordHash,
    postalCode,
    sponsor,
    street,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const passwordHashed = await bcrypt.hash(passwordHash, 6)

    const org = await this.orgsRepository.create({
      cellphone,
      email,
      password_hash: passwordHashed,
      postal_code: postalCode,
      sponsor,
      street,
    })

    return {
      org,
    }
  }
}
