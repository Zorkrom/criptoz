import { Response, Router } from 'express'
import { Actions } from '../actions'

const router = Router()

router.get('/', (res: Response) => {
    const salutation: string = Actions.salute()
    res.send(salutation)
})
    
export default router
