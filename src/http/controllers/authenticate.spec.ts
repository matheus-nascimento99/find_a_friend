import request from 'supertest'
import app from '@/app'
import { it, expect, describe, beforeAll, afterAll } from 'vitest'
describe('Auth (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to auth', async () => {
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

    expect(authenticateResponse.status).toEqual(200)
    expect(authenticateResponse.body).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    )
  })
})
