import { DBClient } from "../infrastructure/DBClient"

export default class Users{

    static collection() {
        return DBClient.getCollection('cryptoz')
    }

    static async getAll():Promise<Array<Object>>{
        return await this.collection().find({}, {projection: {_id:false}}).toArray()
    }
    static async save(user: Object): Promise<void> {
        await this.collection().insertOne(user)
    }
    static async flush(): Promise<void> {
        await this.collection().deleteMany({})
    }
}