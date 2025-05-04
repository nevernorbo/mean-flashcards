import { Injectable, signal } from '@angular/core';
import {
  CardCollection,
  CreateNewCollectionForm,
} from '../models/card.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private url = 'http://localhost:5200/api';

  cardCollection$ = signal<CardCollection>({} as CardCollection);

  constructor(private httpClient: HttpClient) {}

  getOwnedCardCollections() {
    return this.httpClient.get<CardCollection[]>(
      `${this.url}/card-collections/owned`,
      { withCredentials: true }
    );
  }

  getForeignCardCollections() {
    return this.httpClient.get<CardCollection[]>(
      `${this.url}/card-collections/foreign`,
      { withCredentials: true }
    );
  }

  toggleLikeCollection(id: string) {
    return this.httpClient.post(`${this.url}/card-collection/like`, id, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  getCardCollection(id: string) {
    this.httpClient
      .get<CardCollection>(`${this.url}/card-collection/${id}`, {
        withCredentials: true,
      })
      .subscribe((cardCollection) => this.cardCollection$.set(cardCollection));
  }

  createCardCollection(createNewCollectionForm: CreateNewCollectionForm) {
    return this.httpClient.post(
      `${this.url}/card-collection`,
      createNewCollectionForm,
      { withCredentials: true }
    );
  }

  // TODO update collection info
  updateCardCollection(cardCollection: CardCollection) {
    return this.httpClient.patch(
      `${this.url}/card-collection/${this.cardCollection$()._id}`,
      cardCollection,
      { responseType: 'text', withCredentials: true }
    );
  }

  deleteCardCollection() {
    return this.httpClient.delete(
      `${this.url}/card-collection/${this.cardCollection$()._id}`,
      {
        responseType: 'text',
        withCredentials: true,
      }
    );
  }
}
