import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from '@prisma/client'
import { AuthenticationError } from './errors/authentication-error'
import * as bcrypt from 'bcrypt'

export type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

export type AuthenticateUseCaseResponse = {
  org: Organization
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async axecute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findOneByEmail(email)

    if (org === null) {
      throw new AuthenticationError()
    }

    const isItPasswordsEquals = await bcrypt.compare(
      password,
      org.password_hash,
    )

    if (!isItPasswordsEquals) {
      throw new AuthenticationError()
    }

    return {
      org,
    }
  }
}
