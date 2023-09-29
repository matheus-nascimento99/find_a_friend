import request from 'supertest'
import app from '@/app'
import { it, expect, describe, beforeAll, afterAll } from 'vitest'
describe('Create org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an org', async () => {
    const response = await request(app.server).post('/create-org').send({
      cellphone: '11951195312',
      postalCode: '05767001',
      email: 'jhondoe@mail.com',
      passwordHash: '123456',
      sponsor: 'Jhon',
      street: 'rua jhon doe 97',
    })
    const { org } = response.body
    expect(response.status).toEqual(201)
    expect(org).toEqual(expect.objectContaining({ email: 'jhondoe@mail.com' }))
  })
})
