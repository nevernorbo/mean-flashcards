import { DatePipe } from '@angular/common';
import { Component, computed, input, InputSignal } from '@angular/core';
import { CardCollection } from '@features/collections/models/card.interface';
import { Heart, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'collection-card',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './card.component.html',
})
export class CardComponent {
  readonly Heart = Heart;

  currentUserId = input('');
  cardCollection: InputSignal<CardCollection> = input({} as CardCollection);
  isSkeletonLoader = input(false);

  isLiked = computed(() => {
    if (this.isSkeletonLoader()) {
      return false;
    }

    if (this.cardCollection().likedBy.includes(this.currentUserId())) {
      return true;
    } else {
      return false;
    }
  });

  openCollection() {
    console.log("Open clicked");
  }

  toggleLikeCollection(event: MouseEvent) {
    console.log("Like clicked");

    // Do not accidentally open the collection when the user clicks the like button
    event.stopPropagation();
  }
}
