import { Injectable, signal } from '@angular/core';
import {
  CardCollection,
  CreateNewCollectionForm,
  EditCollectionForm,
} from '../models/card.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private url = 'http://localhost:5200/api';

  cardCollection$ = signal<CardCollection>({} as CardCollection);
  likedCollections$ = signal<string[]>([]);

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

  // Will return the ids of liked collections
  getLikedCardCollections() {
    this.httpClient
      .get<
        string[]
      >(`${this.url}/card-collections/liked`, { withCredentials: true })
      .subscribe((likedCollectons) =>
        this.likedCollections$.set(likedCollectons)
      );
  }

  toggleLikeCollection(isLiked: boolean, id: string) {
    this.httpClient
      .post(
        `${this.url}/card-collection/like`,
        { isLiked: isLiked, id: id },
        {
          withCredentials: true,
          responseType: 'text',
        }
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getLikedCardCollections();
        },
        error: (error) => {
          console.log('Error toggling like collection: ', error);
        },
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

  updateCardCollection(editCollectionForm: EditCollectionForm) {
    return this.httpClient.patch(
      `${this.url}/card-collection/${this.cardCollection$()._id}`,
      editCollectionForm,
      { withCredentials: true }
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

  fetchOwnerAvatar(ownerId: string) {
    return this.httpClient.get(
      `${this.url}/card-collection/ownerAvatar/${ownerId}`,
      {
        responseType: 'text',
        withCredentials: true,
      }
    );
  }
}
