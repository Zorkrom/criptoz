import { Router , Request, Response} from "express";
import { CoinActions } from "../actions/coinActions";

const CoinRouter = Router()

CoinRouter.post('/saveFavorites',async (req: Request, res: Response) => {
    const favoriteCoins:Array<string>=req.body.favorites
    const username:string=req.body.username
    await CoinActions.save(username,favoriteCoins)
    const response = {
        ok:true,
        message:"Favorites modified",
        payload:favoriteCoins
    }
    res.send(response)
})
CoinRouter.post('/getFavorites', async (req:Request, res: Response) => {
    const username:string = req.body.username
    const favorites:Array<String> = await CoinActions.getFavorites(username)
    const response = {
        ok:true,
        message:"A list with favorites coin",
        payload:favorites
    }
    res.send(response)
})
export default CoinRouter
