import Greetings from "./services/greetings"

export class Actions{

    public static salute():string{
        return Greetings.salute('Hola mundo')
    }
}


