import { Organization, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findOneByEmail(email: string): Promise<Organization | null>
}
