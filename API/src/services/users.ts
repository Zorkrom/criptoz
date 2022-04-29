import Repository from "../repositories/users"

export default class Users{

    public static async create(description:any): Promise<Object>{
        description.membership = 'free'
        await Repository.save(description)
        return description
    }

}
