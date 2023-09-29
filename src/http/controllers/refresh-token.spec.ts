import request from 'supertest'
import app from '@/app'
import { it, expect, describe, beforeAll, afterAll } from 'vitest'
describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
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

    const cookie = authenticateResponse.get('Set-Cookie')

    const refreshTokenResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(refreshTokenResponse.status).toEqual(200)
    expect(refreshTokenResponse.body).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    )
    expect(refreshTokenResponse.get('Set-Cookie')).toEqual(
      expect.arrayContaining([expect.stringContaining('refreshToken=')]),
    )
  })
})
