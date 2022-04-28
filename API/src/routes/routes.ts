import { Response, Request,Router } from 'express'
import { Actions } from '../actions'

const router = Router()

router.get('/', (res: Response) => {
    const salutation = Actions.api()
    res.send(salutation)
})

router.get('/name', (req: Request, res: Response) => {
    const name: string = Actions.retrieveName()
    res.send(name)
})
    
export default router
