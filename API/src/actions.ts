import Greetings from "./services/greetings"
import axios from 'axios';
import Configuration from "./services/configuration";

export class Actions{

    public static salute():string{
        return Greetings.salute('Hola mundo')
    }

    public static retrieveName():string{
        return new Configuration().retrieveDenomination()
    }

    public static api(){
        const info = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        return info
    }
}


