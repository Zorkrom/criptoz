import Settings from "./settings"
import jwt from 'jsonwebtoken'

export default class JwtVerifier{
    private static readonly SECRET = Settings.secretKey()

    static createToken(username:string):string {
        const payload = {
            user:username,
            tokenCreationDate: new Date().getTime()
        }
        return jwt.sign(payload,this.SECRET,{expiresIn: '5m'})
    }
}