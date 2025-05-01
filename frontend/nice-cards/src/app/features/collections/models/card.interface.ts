export interface CardCollection {
  _id?: string;
  creationDate: string;
  cards: Card[];
  title: string;
  summary: string;
  likedBy: string[];
  ownerId: string;
  visibility: CardCollectionVisibility;
}

export interface Card {
  front?: string;
  back?: string;
  order: number;
}

export enum CardCollectionVisibility {
  Private,
  Public,
}

export interface CreateNewCollectionForm {
  title: string;
  visibility: CardCollectionVisibility;
}
