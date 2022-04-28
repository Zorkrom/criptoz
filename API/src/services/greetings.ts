export default class Greetings{
    salute:string
    standard:string

    constructor(salute:string, standard:string){
        this.salute = salute
        this.standard = standard
    }
    
    public static salute(greeting:string):string{   
        return greeting 
    }
}