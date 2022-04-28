import { Response, Router } from 'express'
import { Actions } from '../actions'

const router = Router()

router.get('/', (res: Response) => {
    const salutation = Actions.api()
    res.send(salutation)
})
    
export default router
