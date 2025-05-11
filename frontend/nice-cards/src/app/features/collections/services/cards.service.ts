import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Card } from '../models/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private url = 'http://localhost:5200/api';

  collectionId = signal<string>('');

  cards$ = signal<Card[]>([]);
  currentCard$ = signal<Card>({} as Card);
  editedCard = signal<Card>({} as Card);

  constructor(private httpClient: HttpClient) {}

  getCards(ignoreCurrentCard?: boolean) {
    return this.httpClient
      .get<Card[]>(`${this.url}/cards/${this.collectionId()}`, {
        withCredentials: true,
      })
      .subscribe((cards) => {
        this.cards$.set(cards);

        if (
          cards.length > 0 &&
          (ignoreCurrentCard || this.isEmpty(this.currentCard$()))
        ) {
          this.currentCard$.set(cards[0]);
        }
      });
  }

  createCard(card: Card) {
    return this.httpClient.post(
      `${this.url}/cards/${this.collectionId()}`,
      card,
      {
        withCredentials: true,
      }
    );
  }

  updateCard(front: string, back: string) {
    return this.httpClient.patch(
      `${this.url}/cards/${this.collectionId()}/${this.currentCard$().order}`,
      { front, back },
      {
        withCredentials: true,
      }
    );
  }

  deleteCard() {
    return this.httpClient.delete(
      `${this.url}/cards/${this.collectionId()}/${this.currentCard$().order}`,
      {
        responseType: 'text',
        withCredentials: true,
      }
    );
  }

  isEmpty(obj: any) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }
}
