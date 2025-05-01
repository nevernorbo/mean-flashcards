import { ObjectId } from "mongodb";

export interface CardCollection {
    _id?: ObjectId;
    creationDate: string;
    cards: Card[];
    title: string;
    summary: string;
    likedBy: ObjectId[];
    ownerId: ObjectId;
    visibility: CardCollectionVisibility;
}

export enum CardCollectionVisibility {
    Private,
    Public,
}

export interface Card {
    front?: string;
    back?: string;
    order: number;
}
