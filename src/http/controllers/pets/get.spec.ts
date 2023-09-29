import request from 'supertest'
import app from '@/app'
import { it, expect, describe, beforeAll, afterAll } from 'vitest'
describe('Get pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const createOrgResponse = await request(app.server)
      .post('/create-org')
      .send({
        cellphone: '11951195312',
        postalCode: '05767001',
        email: 'jhondoe@mail.com',
        passwordHash: '123456',
        sponsor: 'Jhon',
        street: 'rua jhon doe 97',
      })

    const { org } = createOrgResponse.body

    const authenticateResponse = await request(app.server)
      .post('/session')
      .send({ email: org.email, password: '123456' })

    const { token } = authenticateResponse.body

    const createPetResponse = await request(app.server)
      .post('/create-pet')
      .send({
        name: 'teste-01',
        age: 'teste-01',
        about: 'teste-01',
        mien: 'teste-01',
        energyLevel: 'teste-01',
        independenceLevel: 'teste-01',
        city: 'teste-01',
        photos: [{ url: 'google.com.br' }, { url: 'github.com' }],
        requirements: [{ requirement: '1234' }],
      })
      .set('Authorization', `Bearer ${token}`)

    const { pet: createdPet } = createPetResponse.body
    const getPetResponse = await request(app.server).get(
      `/get-pet/${createdPet.id}`,
    )

    const { pet } = getPetResponse.body

    expect(getPetResponse.status).toEqual(200)
    expect(pet).toEqual(expect.objectContaining({ city: 'teste-01' }))
  })
})
