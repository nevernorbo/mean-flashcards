import {
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Card } from '@features/collections/models/card.interface';
import { CardService } from '@features/collections/services/cards.service';
import {
  BetweenVerticalEnd,
  CircleArrowLeft,
  CircleArrowRight,
  LucideAngularModule,
  Pencil,
  Plus,
  X,
} from 'lucide-angular';
import { FlashCardComponent } from '../flash-card/flash-card.component';
import { ConfirmPopupComponent } from '@shared/components/confirm-popup/confirm-popup';

@Component({
  selector: 'flash-cards',
  imports: [LucideAngularModule, FlashCardComponent, ConfirmPopupComponent],
  templateUrl: './flash-cards.component.html',
})
export class FlashCardsComponent implements OnInit {
  readonly CircleArrowLeft = CircleArrowLeft;
  readonly CircleArrowRight = CircleArrowRight;
  readonly Plus = Plus;
  readonly BetweenVerticalEnd = BetweenVerticalEnd;
  readonly Pencil = Pencil;
  readonly X = X;

  collectionId = input<string>('');
  userCanEdit = input<boolean>(false);

  cards = input<Card[]>([]);
  currentCard = signal<Card>({} as Card);

  ngOnInit() {
    this.currentCard = this.cardService.currentCard$;
  }

  createClicked = output();
  editClicked = output();

  frontShown = signal<boolean>(true);
  animationDisabled = signal<boolean>(false);
  showDeletePopup = signal<boolean>(false);

  constructor(private cardService: CardService) {}

  hasNextCard = computed<boolean>(() => {
    if (this.currentCard()?.order < this.cards()?.length) {
      return true;
    }

    return false;
  });

  hasPreviousCard = computed<boolean>(() => {
    if (this.currentCard() && this.currentCard()?.order > 1) {
      return true;
    }

    return false;
  });

  handlePaging(direction: 'next' | 'previous') {
    let pagingCheck;
    let pageDirection;

    if (direction === 'next') {
      pagingCheck = this.hasNextCard;
      pageDirection = 1;
    } else {
      pagingCheck = this.hasPreviousCard;
      pageDirection = -1;
    }

    if (pagingCheck()) {
      // This is done so that the user can't "peak" at the back because of the animation
      this.animationDisabled.set(true);

      this.frontShown.set(true);
      this.currentCard.set(
        this.cards().find(
          (card) => card.order === this.currentCard().order + pageDirection
        )!
      );
      setTimeout(() => this.animationDisabled.set(false));
    }
  }

  flipCard() {
    this.frontShown.set(!this.frontShown());
  }

  create() {
    this.createClicked.emit();
  }

  edit() {
    this.editClicked.emit();
  }

  deleteClicked() {
    this.showDeletePopup.set(true);
  }

  deleteCardPopupClosed() {
    this.showDeletePopup.set(false);
  }

  delete() {
    this.cardService.deleteCard().subscribe({
      next: (response) => {
        this.cardService.getCards(true);
        this.showDeletePopup.set(false);

        console.log('Successfully deleted a card: ', response);
      },
      error: (error) => {
        console.log('Error when trying to delete a card: ', error);
      },
    });
  }
}
