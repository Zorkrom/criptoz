import Configuration from "./services/configuration";
import Users from "./services/users";

export class Actions{

    public static retrieveName():string{
        return new Configuration().retrieveDenomination()
    }

    public static async createUser(message:Object):Promise<Object>{
        return await Users.create(message)

    }
}


