import Users from "../repositories/users";

export class CoinService{
    public static async saveFavorites(username:string,coinsToSave:Array<string>):Promise<void>{
        await Users.saveFavorites(username,coinsToSave)
    }
    public static async getFavorites(username:string):Promise<Array<string>>{
        const account = await Users.getFavorites(username)
        const favorites = account!.favorites
        return favorites
    }
}