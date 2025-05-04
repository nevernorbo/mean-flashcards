import { Component, signal } from '@angular/core';
import { LucideAngularModule, Search, SlidersHorizontal } from 'lucide-angular';
import { CollectionCardsComponent } from '../../components/collection-cards/collection-cards.component';
import { NewCollectionComponent } from '../new-collection/new-collection.component';

@Component({
  selector: 'app-collections',
  imports: [LucideAngularModule, CollectionCardsComponent, NewCollectionComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
})
export class CollectionsComponent {
  readonly Search = Search;
  readonly SlidersHorizontal = SlidersHorizontal;

  createPopupOpen = signal(false);

  checkPopupStatus(value: boolean) {
    this.createPopupOpen.set(value);
  }

  popupClosed() {
    this.createPopupOpen.set(false);
  }
}
