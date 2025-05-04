import { Component, output, signal } from '@angular/core';
import { CollectionCardComponent } from '../collection-card/card.component';
import { CardCollection } from '@features/collections/models/card.interface';
import { CollectionService } from '@features/collections/services/collection.service';
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
  imports: [CollectionCardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './collection-cards.component.html',
})
export class CollectionCardsComponent {
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
    private collectionService: CollectionService
  ) {
    this.currentUserId = this.authService.authenticatedUser()?._id ?? '';

    this.collectionService.getOwnedCardCollections().subscribe({
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

    this.collectionService.getForeignCardCollections().subscribe({
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
