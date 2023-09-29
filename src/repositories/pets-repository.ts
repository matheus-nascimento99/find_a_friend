import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(
    data: Prisma.PetUncheckedCreateInput,
  ): Promise<Prisma.PetUncheckedCreateInput | Pet>
  findMany(
    city: string,
    age: string | null,
    energyLevel: string | null,
    mien: string | null,
    independenceLevel: string | null,
  ): Promise<Prisma.PetUncheckedCreateInput[] | Pet[]>
  findById(petId: string): Promise<Prisma.PetUncheckedCreateInput | Pet | null>
}
