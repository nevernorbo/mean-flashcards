import { DatePipe } from '@angular/common';
import { Component, computed, input, InputSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CardCollection } from '@features/collections/models/card.interface';
import { CollectionService } from '@features/collections/services/collection.service';
import { Heart, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'collection-card',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './card.component.html',
})
export class CollectionCardComponent {
  readonly Heart = Heart;

  currentUserId = input('');
  cardCollection: InputSignal<CardCollection> = input({} as CardCollection);
  isSkeletonLoader = input(false);

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

  openCollection() {
    this.router.navigateByUrl(`/collection/${this.cardCollection()._id}`);
  }

  toggleLikeCollection(event: MouseEvent) {
    console.log('Like clicked');

    this.collectionService.toggleLikeCollection(
      this.isLiked(),
      this.cardCollection()._id!
    );

    // Do not accidentally open the collection when the user clicks the like button
    event.stopPropagation();
  }
}
