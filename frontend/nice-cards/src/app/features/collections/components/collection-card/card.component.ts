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
    if (this.isSkeletonLoader()) {
      return false;
    }

    // TODO
    return true;
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

    // Do not accidentally open the collection when the user clicks the like button
    event.stopPropagation();
  }
}
