import { Response, Request,Router } from 'express'
import { Actions } from '../actions/actions'

const router = Router()

router.get('/name', (req: Request, res: Response) => {
    const name: string = Actions.retrieveName()
    res.send(name)
})

export default router
