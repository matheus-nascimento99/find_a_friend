import request from 'supertest'
import app from '@/app'
import { it, expect, describe, beforeAll, afterAll } from 'vitest'
describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
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
        name: 'teste',
        age: 'teste',
        about: 'teste',
        mien: 'teste',
        energyLevel: 'teste',
        independenceLevel: 'teste',
        city: 'teste',
        photos: [{ url: 'google.com.br' }, { url: 'github.com' }],
        requirements: [{ requirement: '1234' }],
      })
      .set('Authorization', `Bearer ${token}`)

    const { pet } = createPetResponse.body

    expect(createPetResponse.status).toEqual(201)
    expect(pet).toEqual(expect.objectContaining({ name: 'teste' }))
  })
})
