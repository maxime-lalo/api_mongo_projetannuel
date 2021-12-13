import {config} from "dotenv";
config();
import { MongoClient } from "mongodb";

export class DatabaseUtils {
        private static connection?: MongoClient;

        static async getConnection(): Promise<MongoClient> {
            let uri:string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&writeConcern=majority`;
            const client = new MongoClient(uri);
            try{
                await client.connect();
                const database = client.db(process.env.DB_NAME);

                return client;
            }catch(err){
                console.log("Error while initializing connection : ",err);
                return client;
            }
        }

}
