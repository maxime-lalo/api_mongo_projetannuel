import { MongoClient, Db, Collection } from 'mongodb';
import { Bid, IBidProps } from '../models/bid.model';

export class BidController {

    private database:Collection<Document>;

    constructor(connection: MongoClient) {
        this.database = connection.db("projet_annuel").collection('bid');
    }

    async getAll(): Promise<Bid[]> {
        let bids:any = await this.database.find().toArray();
        let returnBids:Bid[] = [];
        for(let i = 0; i < bids.length; i++){
            returnBids.push({
                id: bids[i].id,
                creator: bids[i].creator,
                active: bids[i].active
            });
        }
        return returnBids;
    }

    async getUserBids(user: string): Promise<Bid[]> {
        const filter = {
            creator: user
        };
        let bids:any = await this.database.find(filter).toArray();
        let returnBids:Bid[] = [];
        for(let i = 0; i < bids.length; i++){
            returnBids.push({
                id: bids[i].id,
                creator: bids[i].creator,
                active: bids[i].active
            });
        }
        return returnBids;
    }

    async create(bid: IBidProps): Promise<Bid | null> {
        let returnBid = await this.database.insertOne(bid as unknown as Document);
        return new Bid(bid);
    }

    async desactivateOne(id:number): Promise<Boolean>{
        const filter = { id : id, active: true };
        const updateDoc = {
            $set: {
              active: false
            },
          };
        let bid = await this.database.updateOne(filter,updateDoc);
        return bid.matchedCount > 0;
    }
}