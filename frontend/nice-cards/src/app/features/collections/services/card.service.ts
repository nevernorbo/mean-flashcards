import { Injectable } from '@angular/core';
import {
  CardCollection,
  CreateNewCollectionForm,
} from '../models/card.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private url = 'http://localhost:5200/api';

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

  getCardCollection(id: string) {
    this.httpClient.get<CardCollection>(`${this.url}/card-collections/${id}`);
  }

  createCardCollection(createNewCollectionForm: CreateNewCollectionForm) {
    return this.httpClient.post(
      `${this.url}/card-collection`,
      createNewCollectionForm,
      { withCredentials: true }
    );
  }

  updateCardCollection(id: string, cardCollection: CardCollection) {
    return this.httpClient.put(
      `${this.url}/card-collection/${id}`,
      cardCollection,
      { responseType: 'text' }
    );
  }

  deleteCardCollection(id: string) {
    return this.httpClient.delete(`${this.url}/card-collection/${id}`, {
      responseType: 'text',
    });
  }
}
