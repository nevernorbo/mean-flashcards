import { Component, output, signal } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { CardCollection } from '@features/collections/models/card.interface';
import { CollectionService } from '@features/collections/services/collection.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  BookMarked,
  CirclePlus,
  LibraryBig,
  LucideAngularModule,
} from 'lucide-angular';
import { forkJoin, timer } from 'rxjs';
import { CollectionCardComponent } from '../collection-card/card.component';

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
    private authService: AuthService,
    private collectionService: CollectionService
  ) {
    this.currentUserId = this.authService.authenticatedUser()?._id ?? '';

    // Set minimum skeleton display times with forkJoin
    forkJoin([
      this.collectionService.getOwnedCardCollections(),
      timer(500),
    ]).subscribe({
      next: ([cardCollections]) => {
        this.ownedCardCollections$.set(cardCollections);
        this.fetchingOwnedCollections.set(false);
      },
      error: (error) => {
        console.error('Error trying to get owned card collections: ', error);
        this.fetchingOwnedCollections.set(false);
      },
    });

    forkJoin([
      this.collectionService.getForeignCardCollections(),
      timer(500),
    ]).subscribe({
      next: ([cardCollections]) => {
        this.foreignCardCollections$.set(cardCollections);
        this.fetchingForeignCollections.set(false);
      },
      error: (error) => {
        console.error('Error trying to get foreign card collections: ', error);
        this.fetchingForeignCollections.set(false);
      },
    });

    this.collectionService.getLikedCardCollections();
  }

  handleCreateClicked() {
    this.isCreatePopupOpen.set(true);
    this.createPopupToggled.emit(this.isCreatePopupOpen());
  }
}
