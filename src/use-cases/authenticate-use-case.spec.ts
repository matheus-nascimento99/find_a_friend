import { it, expect, describe, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org-use-case'
import { AuthenticationError } from './errors/authentication-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    const organizationUseCase = new CreateOrgUseCase(orgsRepository)

    await organizationUseCase.execute({
      cellphone: '11951195312',
      email: 'johndoe@mail.com',
      passwordHash: '123456',
      postalCode: '05767001',
      sponsor: 'Matheus Nascimento',
      street: 'Rua Profª Nina Stocco, 596',
    })

    const { org } = await sut.axecute({
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(org).toEqual(expect.objectContaining({ id: 'org-01' }))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const organizationUseCase = new CreateOrgUseCase(orgsRepository)

    await organizationUseCase.execute({
      cellphone: '11951195312',
      email: 'johndoe@mail.com',
      passwordHash: '123456',
      postalCode: '05767001',
      sponsor: 'Matheus Nascimento',
      street: 'Rua Profª Nina Stocco, 596',
    })

    expect(
      async () =>
        await sut.axecute({
          email: 'johndo@mail.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(AuthenticationError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const organizationUseCase = new CreateOrgUseCase(orgsRepository)

    await organizationUseCase.execute({
      cellphone: '11951195312',
      email: 'johndoe@mail.com',
      passwordHash: '123456',
      postalCode: '05767001',
      sponsor: 'Matheus Nascimento',
      street: 'Rua Profª Nina Stocco, 596',
    })

    expect(
      async () =>
        await sut.axecute({
          email: 'johndoe@mail.com',
          password: '1234567',
        }),
    ).rejects.toBeInstanceOf(AuthenticationError)
  })
})
