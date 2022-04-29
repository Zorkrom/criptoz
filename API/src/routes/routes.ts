import { Response, Request,Router } from 'express'
import { Actions } from '../actions'

const router = Router()

router.get('/name', (req: Request, res: Response) => {
    const name: string = Actions.retrieveName()
    res.send(name)
})

router.post('/create', async (req: Request, res: Response) => {
    const result = await Actions.createUser(req.body)
    res.send(result)
})
    
export default router
