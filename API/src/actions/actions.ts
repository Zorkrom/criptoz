import AuthService from "../services/auth";
import Configuration from "../services/configuration";
export class Actions{

    public static retrieveName():string{
        return new Configuration().retrieveDenomination()
    }

}


