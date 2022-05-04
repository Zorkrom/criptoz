import JwtVerifier from "../infrastructure/jwtVerifier";
import AuthService from "../services/auth";
import { TokenResponse } from "../shared/tokenResponse";

export class AuthActions{
    public static async create(username:string,password:string):Promise<object>{
        const exists:boolean = await AuthService.userExists(username)
        if(exists) return {ok:false}
        await AuthService.create({username:username,password:password})
        const response:any = await this.verifyUser(username,password)
        response.ok= true
        return response
    }

    public static async verifyUser(username:string,password:string): Promise<object>{
        const user:TokenResponse = await AuthService.verifyUser(username,password)
        const token:string = JwtVerifier.createToken(username)
        
        const response = {
            isLogged: user.isLogged,
            token:token
        }
        return response
    }
}