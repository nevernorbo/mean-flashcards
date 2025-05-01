import { Component, input, output, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardCollection } from '@features/collections/models/card.interface';
import { CardService } from '@features/collections/services/card.service';
import { AuthService } from '@core/auth/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  LucideAngularModule,
  BookMarked,
  LibraryBig,
  CirclePlus,
} from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'collection-cards',
  imports: [CardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  readonly BookMarked = BookMarked;
  readonly LibraryBig = LibraryBig;
  readonly CirclePlus = CirclePlus;

  currentUserId = '';

  isCreatePopupOpen = signal(false);
  createPopupToggled = output<boolean>();

  ownedCardCollections$ = signal<CardCollection[]>([]);
  foreignCardCollections$ = signal<CardCollection[]>([]);

  fetchingOwnedCollections = signal(true);
  fetchingForeignCollections = signal(true);

  constructor(
    private router: Router,
    private authService: AuthService,
    private cardService: CardService
  ) {
    this.currentUserId = this.authService.authenticatedUser()?._id ?? '';

    this.cardService.getOwnedCardCollections().subscribe({
      next: (cardCollections) => {
        this.ownedCardCollections$.set(cardCollections);
      },
      error: (error) => {
        console.log('Error trying to get card collections: ', error);
      },
      complete: () => {
        this.fetchingOwnedCollections.set(false);
      },
    });

    this.cardService.getForeignCardCollections().subscribe({
      next: (cardCollections) => {
        this.foreignCardCollections$.set(cardCollections);
      },
      error: (error) => {
        console.log('Error trying to get card collections: ', error);
      },
      complete: () => {
        this.fetchingForeignCollections.set(false);
      },
    });
  }

  handleCreateClicked() {
    this.isCreatePopupOpen.set(true);
    this.createPopupToggled.emit(this.isCreatePopupOpen());
  }
}
