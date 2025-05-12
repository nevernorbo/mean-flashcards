import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import {
  Card,
  CardCollection,
} from '@features/collections/models/card.interface';
import { CardService } from '@features/collections/services/cards.service';
import { CollectionService } from '@features/collections/services/collection.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { OutlinedButtonComponent } from '@shared/components/button/outlined-button.component';
import { ConfirmPopupComponent } from '@shared/components/confirm-popup/confirm-popup';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { LucideAngularModule, Pencil, Trash } from 'lucide-angular';
import { EditFlashCardComponent } from '../../components/edit-flash-card/edit-flash-card.component';
import { FlashCardsComponent } from '../../components/flash-cards/flash-cards.component';
import { EditCollectionPopupComponent } from '../edit-collection/edit-collection.component';

@Component({
  selector: 'card-collection',
  imports: [
    LucideAngularModule,
    FlashCardsComponent,
    DatePipe,
    ButtonComponent,
    OutlinedButtonComponent,
    EditFlashCardComponent,
    NgClass,
    ConfirmPopupComponent,
    EditCollectionPopupComponent,
  ],
  templateUrl: 'collection.component.html',
})
export class CollectionComponent implements OnInit {
  readonly Pencil = Pencil;
  readonly Trash = Trash;

  cardCollection = signal<CardCollection>({} as CardCollection);
  cards = signal<Card[]>([]);
  currentCard = signal<Card>({} as Card);

  editing = signal<'create' | 'edit' | false>(false);
  showDeletePopup = signal<boolean>(false);
  showEditCollectionPopup = signal<boolean>(false);

  userCanEdit = computed<boolean>(() => {
    if (
      this.authService.isModeratorOrAdmin() ||
      this.authService.authenticatedUser()?._id ===
        this.cardCollection().ownerId
    ) {
      return true;
    }
    return false;
  });

  ngOnInit() {
    this.fetchCards();
  }

  private fetchCards(): void {
    this.cards = this.cardService.cards$;
    this.currentCard = this.cardService.currentCard$;
    this.cardService.getCards();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private collectionService: CollectionService,
    private cardService: CardService,
    private notificationService: NotificationService
  ) {
    const collectionId = this.route.snapshot.paramMap.get('id');

    if (!collectionId) {
      alert('No collection id provided');
      return;
    }

    this.collectionService.getCardCollection(collectionId);
    this.cardCollection = this.collectionService.cardCollection$;
    this.cardService.collectionId.set(collectionId);
  }

  quickNavigate(card: Card) {
    this.cardService.currentCard$.set(card);
  }

  beginEditing(type: 'create' | 'edit') {
    switch (type) {
      case 'create':
        this.cardService.editedCard.set({
          order: this.cards().length + 1,
        } as Card);
        break;
      case 'edit':
        this.cardService.editedCard.set(this.currentCard());
        break;
    }

    this.editing.set(type);
  }

  finishEditing() {
    this.editing.set(false);
  }

  deleteClicked() {
    this.showDeletePopup.set(true);
  }

  deleteCardPopupClosed() {
    this.showDeletePopup.set(false);
  }

  editCollectionClicked() {
    this.showEditCollectionPopup.set(true);
  }

  editCollectionPopupClosed() {
    this.showEditCollectionPopup.set(false);
  }

  delete() {
    this.collectionService.deleteCardCollection().subscribe({
      next: (response) => {
        this.showDeletePopup.set(false);
        this.router.navigateByUrl('/collections');
        this.notificationService.show(
          'Successfully deleted collection',
          'success'
        );

        console.log('Successfully deleted a card: ', response);
      },
      error: (error) => {
        console.log('Error when trying to delete a card: ', error);
        this.notificationService.show(
          'Error while trying to delete collection',
          'error'
        );
      },
    });
  }
}
