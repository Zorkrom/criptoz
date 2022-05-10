export default class Settings {

    static dbUriAcces:string = 'mongodb+srv://belike:belike@cluster0.onwds.mongodb.net/criptoz?retryWrites=true&w=majority'
    static dbUri(): string {
        return 'mongodb://mongo_cryptoz:27017'
    }

    static dbName(): string {
        return 'cryptoz'
    }
    static secretKey():string{
        return 'secretProject'
    }
}
