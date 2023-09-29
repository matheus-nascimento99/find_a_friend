import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/database'

type PetQueryWhere = {
  city: string
  age?: string
  energy_level?: string
  mien?: string
  independence_level?: string
}

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        organizationId: data.organizationId,
        about: data.about,
        age: data.age,
        city: data.city,
        energy_level: data.energy_level,
        independence_level: data.independence_level,
        mien: data.mien,
      },
    })

    return pet
  }

  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }

  async findMany(
    city: string,
    age: string | null,
    energyLevel: string | null,
    mien: string | null,
    independenceLevel: string | null,
  ) {
    const where: PetQueryWhere = {
      city,
    }

    if (age !== null && age.length > 0) {
      where.age = age
    }

    if (energyLevel !== null && energyLevel.length > 0) {
      where.energy_level = energyLevel
    }

    if (mien !== null && mien.length > 0) {
      where.mien = mien
    }

    if (independenceLevel !== null && independenceLevel.length > 0) {
      where.independence_level = independenceLevel
    }
    const pets = await prisma.pet.findMany({
      where,
    })

    return pets
  }
}
