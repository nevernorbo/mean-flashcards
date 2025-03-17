import { Component } from '@angular/core';
import { LucideAngularModule, Search, SlidersHorizontal } from 'lucide-angular';
import { CardsComponent } from '../../components/cards/cards.component';

@Component({
  selector: 'app-collections',
  imports: [LucideAngularModule, CardsComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
})
export class CollectionsComponent {
  readonly Search = Search;
  readonly SlidersHorizontal = SlidersHorizontal;
}
