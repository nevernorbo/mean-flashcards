import * as mongodb from "mongodb";
import { User } from "./models/user";
import { CardCollection } from "./models/card";

export const collections: {
    users?: mongodb.Collection<User>;
    cardCollections?: mongodb.Collection<CardCollection>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("nice_cards");

    const usersCollection = db.collection<User>("users");
    const cardCollectionsCollection = db.collection<CardCollection>("cardCollections");

    collections.users = usersCollection;
    collections.cardCollections = cardCollectionsCollection;
}
