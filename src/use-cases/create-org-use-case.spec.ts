import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org-use-case'
import { compare } from 'bcrypt'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a organization', async () => {
    const { org } = await sut.execute({
      cellphone: '11951195312',
      email: 'johndoe@mail.com',
      passwordHash: '123456',
      postalCode: '05767001',
      sponsor: 'Matheus Nascimento',
      street: 'Rua Profª Nina Stocco, 596',
    })

    expect(org).toEqual(expect.objectContaining({ id: 'org-01' }))
  })

  it('should be able to hash password', async () => {
    const { org } = await sut.execute({
      cellphone: '11951195312',
      email: 'johndoe@mail.com',
      passwordHash: '123456',
      postalCode: '05767001',
      sponsor: 'Matheus Nascimento',
      street: 'Rua Profª Nina Stocco, 596',
    })

    const isPasswordHashed = await compare('123456', org.password_hash)

    expect(isPasswordHashed).toBe(true)
  })
})
