import { JwtHelperService } from '@auth0/angular-jwt'

export class Token{

    static jwtHelper: JwtHelperService = new JwtHelperService()
    
    public static set(token:string):void{
        localStorage.setItem('TOKEN',token)
    }
    public static isValid():boolean{
        const token = localStorage.getItem('TOKEN')
        return(token != '' && token != null)
    }
    public static delete():void{
        localStorage.removeItem('TOKEN')
    }
    static getUsername(): string {
        const userInfo: any = this.decode()
        return userInfo['user']
    }
    public static decode(): object {
        const token = localStorage.getItem('TOKEN')!
        let user: object = {}
        if (token) {
            user = this.jwtHelper.decodeToken(token)
        }
        return user
    }
}