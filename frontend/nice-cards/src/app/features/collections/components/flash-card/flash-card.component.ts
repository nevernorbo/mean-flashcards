import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, input, OnInit, signal } from '@angular/core';
import { Card } from '@features/collections/models/card.interface';
import { CardService } from '@features/collections/services/cards.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'flash-card',
  imports: [LucideAngularModule],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css',
  animations: [
    trigger('flip', [
      state('front', style({ transform: 'rotateY(0deg)' })),
      state('back', style({ transform: 'rotateY(180deg)' })),
      transition('front <=> back', animate('0.6s cubic-bezier(0.4,0.2,0.2,1)')),
    ]),
  ],
})
export class FlashCardComponent implements OnInit {
  card = signal<Card>({} as Card);

  frontShown = input<boolean>();
  animationDisabled = input<boolean>();
  pageInfo = input<string>();

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.card = this.cardService.currentCard$;
  }
}
