import { ObjectId } from "mongodb";

export interface CardCollection {
    _id?: ObjectId;
    creationDate: string;
    title: string;
    summary: string;
    ownerId: ObjectId;
    visibility: CardCollectionVisibility;
}

export type CardCollectionVisibility = "private" | "public";

export interface Cards {
    _id: ObjectId; // The same as the CardCollection Id
    cards: Card[];
}

export interface Card {
    front?: string;
    back?: string;
    order: number;
}
