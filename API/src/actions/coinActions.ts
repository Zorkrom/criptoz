import { CoinService } from "../services/coin"

export class CoinActions{
    public static async save(username:string,coins:Array<string>):Promise<void>{
        await CoinService.saveFavorites(username,coins)
    } 
    public static async getFavorites(username:string):Promise<Array<string>>{
        return await CoinService.getFavorites(username)
    }
}