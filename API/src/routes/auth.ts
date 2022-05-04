import { Router, Request, Response } from "express";
import { AuthActions } from "../actions/authActions";

const AuthRouter = Router()

AuthRouter.post('/register',async (req: Request, res: Response) => {
    
    const username: string = req.body.username
    const password: string = req.body.password
    const found: any = await AuthActions.create(username,password)

    const { isLogged,token} = found

    let response: object={
        ok:true,
        payload:token
    }
    if(!isLogged) response = {ok:false,message:'User already exists'}
    res.send(response)
})

AuthRouter.post('/',async (req:Request, res: Response) => {

    const username: string = req.body.username
    const password: string = req.body.password
    const found:any = await AuthActions.verifyUser(username,password)
    
    const { isLogged,token} = found

    let response: object={
        ok:true,
        payload:token
    }
    if(!isLogged) response = {ok:false,message:'Incorrect username or password'}

    res.send(response)
})
export default AuthRouter