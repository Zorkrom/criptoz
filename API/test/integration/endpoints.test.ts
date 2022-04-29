import app from '../../src/api'
import request from 'supertest'
import { DBClient } from '../../src/infrastructure/DBClient'
import Users from '../../src/repositories/users'

describe('endpoints api test', () => {

  beforeAll(async () => {
    DBClient.getInstance().connect()
  })

  afterAll(async () => { DBClient.getInstance().disconnect() })

  beforeEach(async () => {
    await Users.flush()
})
  it('create user', async () => {
    const message = {
      name: "test",
      surname: "surtest"
    }
    const result = await request(app).post('/create').send(message)
    expect(result.body.membership).toBe('free')
  })

})