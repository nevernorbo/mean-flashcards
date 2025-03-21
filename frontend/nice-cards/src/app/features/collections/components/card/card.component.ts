import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { LucideAngularModule, Heart, HeartOff } from 'lucide-angular';

@Component({
  selector: 'collection-card',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './card.component.html',
})
export class CardComponent {
  cardCollection: InputSignal<CardCollection> = input({} as CardCollection);

  // I'll need an isLiked field here, that property belongs to the user and it's stored in a likedCollections array
  readonly Heart = Heart;
  readonly HeartOff = HeartOff;

}

export type CardCollection = {
  id: string;
  name: string;
  ownerId: string;
  overview: string;
  date: string;
};
