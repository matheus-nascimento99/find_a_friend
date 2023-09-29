import request from 'supertest'
import app from '@/app'
import { it, expect, describe, beforeAll, afterAll } from 'vitest'
describe('Fetch pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
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

    await request(app.server)
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

    await request(app.server)
      .post('/create-pet')
      .send({
        name: 'teste-02',
        age: 'teste-02',
        about: 'teste-02',
        mien: 'teste-02',
        energyLevel: 'teste-02',
        independenceLevel: 'teste-02',
        city: 'teste-02',
        photos: [{ url: 'google1.com.br' }, { url: 'github1.com' }],
        requirements: [{ requirement: '12345' }],
      })
      .set('Authorization', `Bearer ${token}`)

    const fetchPetsResponse = await request(app.server)
      .get('/fetch-pets')
      .query({
        city: 'teste-02',
        age: 'teste-02',
        energyLevel: 'teste-02',
        mien: 'teste-02',
        independenceLevel: 'teste-02',
      })

    const { pets } = fetchPetsResponse.body

    expect(fetchPetsResponse.status).toEqual(200)
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ city: 'teste-02' })]),
    )
  })
})
