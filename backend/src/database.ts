import * as mongodb from "mongodb";
import { User } from "./models/user";
import { CardCollection, Cards, LikedCollection } from "./models/card";

export const collections: {
    users?: mongodb.Collection<User>;
    cardCollections?: mongodb.Collection<CardCollection>;
    likedCollections?: mongodb.Collection<LikedCollection>;
    cards?: mongodb.Collection<Cards>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("nice_cards");

    const usersCollection = db.collection<User>("users");
    const cardCollectionsCollection = db.collection<CardCollection>("cardCollections");
    const likedCollectionsCollection = db.collection<LikedCollection>("likedCollections");
    const cardsCollection = db.collection<Cards>("cards");

    collections.users = usersCollection;
    collections.cardCollections = cardCollectionsCollection;
    collections.likedCollections = likedCollectionsCollection;
    collections.cards = cardsCollection;
}
