import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/database'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const org = await prisma.organization.create({
      data: {
        cellphone: data.cellphone,
        email: data.email,
        password_hash: data.password_hash,
        postal_code: data.postal_code,
        sponsor: data.sponsor,
        street: data.street,
      },
    })

    return org
  }

  async findOneByEmail(email: string) {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return org
  }
}
