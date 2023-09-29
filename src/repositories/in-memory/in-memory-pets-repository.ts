import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  items: Prisma.PetUncheckedCreateInput[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: 'pet-01',
      organizationId: data.organizationId,
      name: data.name,
      about: data.about,
      age: data.age,
      mien: data.mien,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      city: data.city,
      photos: data.photos,
      requirements: data.requirements,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findMany(
    city: string,
    age: string | null,
    energyLevel: string | null,
    mien: string | null,
    independenceLevel: string | null,
  ) {
    let pets = this.items.filter((item) => item.city === city)

    if (age !== null) {
      pets = pets.filter((item) => item.age === age)
    }

    if (energyLevel !== null) {
      pets = pets.filter((item) => item.energy_level === energyLevel)
    }

    if (mien !== null) {
      pets = pets.filter((item) => item.mien === mien)
    }

    if (independenceLevel !== null) {
      pets = pets.filter(
        (item) => item.independence_level === independenceLevel,
      )
    }

    return pets
  }

  async findById(petId: string) {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }
}
