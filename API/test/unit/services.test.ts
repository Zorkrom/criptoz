import Configuration from '../../src/services/configuration'
import Greetings from '../../src/services/greetings'
import Authorization from '../../src/services/authorization'


describe('Greeting service', ()=>{
    it('salutes', ()=>{
        const service:Greetings = new Greetings("", "Hello World")
        const salute:string = service.doSalute()
        expect(salute).toBe('Hello World')
    })
    
    it('salutes by name',()=>{
        const service:Greetings = new Greetings("Hi", "")
        const salute:string = service.doSalute('aName')
        expect(salute).toBe('Hi aName')
    })

    it('salutes to strangers',()=>{
        const salutation:string = Greetings.salute('     ')
        expect(salutation).toBe('Hello stranger')
    })
})

describe('Configuration Service',()=>{
    it('retrieves name and version', ()=>{
        const name:string = new Configuration().retrieveDenomination()
        expect(name).toBe('Seed 1.0.0')
    })
})

describe('Authorization service', ()=>{
    it('user or pass are incorrect',()=>{
        const authorization:Authorization = Authorization.verifyUser('xavi','X4V2')
        expect(authorization).toEqual(false)
    })

    it('user and pass are correct', ()=>{
        const authorization:Authorization = Authorization.verifyUser('xavi','X4V1_academy')
        expect(authorization).toEqual(true)
    })

    it('user and pass are incorrect', ()=>{
        const authorization:Authorization = Authorization.verifyUser('xav','X4V')
        expect(authorization).toEqual(false)
    })

})