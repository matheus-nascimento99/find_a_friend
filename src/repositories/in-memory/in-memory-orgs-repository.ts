import { Organization, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const org: Organization = {
      id: 'org-01',
      cellphone: data.cellphone,
      postal_code: data.postal_code,
      email: data.email,
      password_hash: data.password_hash,
      sponsor: data.sponsor,
      street: data.street,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findOneByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
