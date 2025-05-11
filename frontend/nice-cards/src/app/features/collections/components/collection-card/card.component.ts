import { DatePipe } from '@angular/common';
import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CardCollection } from '@features/collections/models/card.interface';
import { CollectionService } from '@features/collections/services/collection.service';
import { Heart, User, LucideAngularModule } from 'lucide-angular';
import { CollectionCardSkeletonComponent } from './card-skeleton.component';

@Component({
  selector: 'collection-card',
  imports: [LucideAngularModule, DatePipe, CollectionCardSkeletonComponent],
  templateUrl: './card.component.html',
})
export class CollectionCardComponent implements OnInit {
  readonly Heart = Heart;
  readonly User = User;

  currentUserId = input('');
  cardCollection: InputSignal<CardCollection> = input({} as CardCollection);
  isSkeletonLoader = input(false);

  ownerAvatarUrl = signal<string>('');

  isLiked = computed(() => {
    const cardCollectionId = this.cardCollection()._id;

    if (
      cardCollectionId &&
      this.collectionService.likedCollections$().includes(cardCollectionId)
    ) {
      return true;
    }

    return false;
  });

  constructor(
    private router: Router,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    if (this.cardCollection().ownerId) {
      this.getOwnerAvatar();
    }
  }

  openCollection() {
    this.router.navigateByUrl(`/collection/${this.cardCollection()._id}`);
  }

  toggleLikeCollection(event: MouseEvent) {
    this.collectionService.toggleLikeCollection(
      this.isLiked(),
      this.cardCollection()._id!
    );

    // Do not accidentally open the collection when the user clicks the like button
    event.stopPropagation();
  }

  getOwnerAvatar() {
    this.collectionService
      .fetchOwnerAvatar(this.cardCollection().ownerId)
      .subscribe({
        next: (response) => {
          this.ownerAvatarUrl.set(response);
        },
        error: (error) => {
          console.error('Error trying to get creator avatar: ', error);
        },
      });
  }

  viewProfileClicked(event: MouseEvent) {
    this.router.navigateByUrl(`/profile/${this.cardCollection().ownerId}`);

    event.stopPropagation();
  }
}
