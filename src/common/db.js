import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb://macajuliodediaz_db_user:julio1997@ac-fxu1aae-shard-00-00.ty0krr5.mongodb.net:27017,ac-fxu1aae-shard-00-01.ty0krr5.mongodb.net:27017,ac-fxu1aae-shard-00-02.ty0krr5.mongodb.net:27017/?ssl=true&replicaSet=atlas-yw9muk-shard-0&authSource=admin&appName=eva-u3-express';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

export default client;