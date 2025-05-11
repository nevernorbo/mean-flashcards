import { Component, signal } from '@angular/core';
import { CollectionCardsComponent } from '../../components/collection-cards/collection-cards.component';
import { NewCollectionComponent } from '../new-collection/new-collection.component';

@Component({
  selector: 'app-collections',
  imports: [CollectionCardsComponent, NewCollectionComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
})
export class CollectionsComponent {
  createPopupOpen = signal(false);

  checkPopupStatus(value: boolean) {
    this.createPopupOpen.set(value);
  }

  popupClosed() {
    this.createPopupOpen.set(false);
  }
}
