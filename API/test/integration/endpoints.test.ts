import app from '../../src/api'
import request from 'supertest'

describe('endpoints api test', () => {

  it('answers greeting', async () => {
    const result = await request(app).get('/')
    expect(result.text).toBe('Hello World')
  })

  it('anwers name and version', async () => {
    const result = await request(app).get('/name')
    expect(result.text).toBe('Seed 1.0.0')
  })

  it('anwers a composed greeting', async () => {
    const theName:string = 'AName'

    const result = await request(app)
      .post('/greet')
      .send({name: theName})
    const parsed = result.body

    expect(result.statusCode).toEqual(200)
    expect(parsed.greet).toEqual(`Hello ${theName}`)
  })

  it('response to a locale', async () => {
    const theName: string = 'AName'

    const result = await request(app)
      .post('/greet')
      .send({ name: theName, language: 'es' })
    const parsed = result.body

    expect(result.statusCode).toEqual(200)
    expect(parsed.greet).toEqual(`Hola ${theName}`)
  })

  it('reject bad login', async () => {
    const result = await request(app).post('/login')
    
    const parsed= result.body
    
    expect(parsed.authorized).toBe("ko")
  })

  it('the route capture the username and password', async () => {
    const username:string = 'xavi'
    const pass:string = 'X4V1_academy'
    
    const result = await request(app)
    .post('/login')
    .send({username:username,pass:pass})

    const parsed= result.body
    
    expect(parsed.authorized).toBe("ok")
  })


})