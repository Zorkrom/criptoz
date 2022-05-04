import app from '../../src/api'
import request from 'supertest'
import { DBClient } from '../../src/infrastructure/DBClient'
import Users from '../../src/repositories/users'
import JwtVerifier from '../../src/infrastructure/jwtVerifier'

describe('endpoints api test', () => {

  beforeAll(async () => {
    DBClient.getInstance().connect()
  })

  afterAll(async () => { 
    await Users.flush()
    DBClient.getInstance().disconnect() 
  })

  beforeEach(async () => {
  })
  it('create user', async () => {
    const message = {
      username: "test",
      password: "surtest"
    }
    const result = await request(app).post('/login/register').send(message)
    expect(result.body.ok).toBe(true)
  })
  it('return message error if user not exist',async() =>{
    const user = { username: 'wrongUser', password: "wrongPassword" }
        const result = await request(app)
            .post('/login')
            .send(user)

        expect(result.body.ok).toBe(false)
        expect(result.body.message).toBe('Incorrect username or password')
  })
  it('can login with a registered user', async () => {
    const user = { username: 'test', password: "surtest" }

    const token = 'falseToken'
    JwtVerifier.createToken = jest.fn().mockReturnValue(token)

    const result = await request(app)
        .post('/login')
        .send(user)

    expect(result.statusCode).toEqual(200)
    expect(result.body.ok).toBe(true)
    expect(result.body.payload).toEqual('falseToken')
})

})