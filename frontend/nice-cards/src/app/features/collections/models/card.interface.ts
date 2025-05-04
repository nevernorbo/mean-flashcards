export interface CardCollection {
  _id?: string;
  creationDate: string;
  title: string;
  summary: string;
  ownerId: string;
  visibility: CardCollectionVisibility;
}

export interface Cards {
  _id: string; // The same as the CardCollection Id
  cards: Card[];
}

export interface Card {
  front?: string;
  back?: string;
  order: number;
}

export type CardCollectionVisibility = 'private' | 'public';

export interface CreateNewCollectionForm {
  title: string;
  visibility: CardCollectionVisibility;
}
