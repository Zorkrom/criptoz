import Users from "../repositories/users"
import { TokenResponse } from "../shared/tokenResponse"
import { User } from "../shared/user"


export default class AuthService{
    public static async create(description:any): Promise<void>{
        await Users.save(description)
    }
    
    public static async userExists(username:string):Promise<boolean>{
        const users = await Users.getAll()
        let exists: boolean = false
        users.forEach((user) => {
            const userTemp = user as User
            if (userTemp.username == username ) {
                exists = true
            }
        })
        return exists
    }
    public static async verifyUser(username:string,password:string): Promise<TokenResponse>{
        const users = await Users.getAll()
        let isLogged: boolean = false
        users.forEach((user) => {
            const userTemp = user as User
            if (userTemp.username == username && userTemp.password == password) {
                isLogged = true
            }
        })
        return {isLogged:isLogged}
    }
}
