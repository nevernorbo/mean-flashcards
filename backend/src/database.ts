import * as mongodb from "mongodb";
import { User } from "./models/user";

export const collections: {
    users?: mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("nice_cards");

    const usersCollection = db.collection<User>("users");
    collections.users = usersCollection;
}
