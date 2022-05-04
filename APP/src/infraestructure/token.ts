export class Token{
    
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
}