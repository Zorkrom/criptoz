import JwtVerifier from "../infrastructure/jwtVerifier";
import AuthService from "../services/auth";
import { TokenResponse } from "../shared/tokenResponse";

export class AuthActions{
    public static async create(message:object): Promise<object>{
        await AuthService.create(message)
        return {ok:true}
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