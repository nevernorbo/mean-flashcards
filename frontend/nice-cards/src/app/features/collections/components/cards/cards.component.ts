import { Component } from '@angular/core';
import { CardCollection, CardComponent } from '../card/card.component';

@Component({
  selector: 'collection-cards',
  imports: [CardComponent],
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  // cardCollections: CardCollection[] = [];
  cardCollections: CardCollection[] = [
    {
      id: '1',
      name: 'Windows',
      overview: 'asdasd asd asd asd asdasd aasd',
      date: '2025-03-12',
      ownerId: '1',
    },
    {
      id: '2',
      name: 'MacOS',
      overview:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum laborum amet ipsam possimus nobis laboriosam voluptatem recusandae itaque distinctio, dolorum molestiae aliquid quasi fugiat autem mollitia animi, quidem perferendis quisquam nemo. Accusantium, ea laboriosam rerum dicta veniam voluptas omnis maxime quidem velit voluptatem voluptate tempora suscipit sequi est maiores, nulla nemo nostrum sunt, iure debitis! In, voluptatum rerum, ullam delectus asperiores sit, adipisci voluptas repudiandae dolores nemo perferendis molestias expedita repellendus ducimus quidem architecto sequi. Voluptates rem dolores, sint pariatur magni temporibus id modi eum maxime dignissimos distinctio animi possimus ipsam cumque assumenda soluta reprehenderit consequatur fuga. Voluptatibus, cupiditate aliquid!',
      date: '2025-03-12',
      ownerId: '1',
    },
    {
      id: '3',
      name: 'Linux',
      overview: 'This is the subtitle',
      date: '2025-03-12',
      ownerId: '1',
    },
    {
      id: '4',
      name: 'Linux',
      overview: 'This is the subtitle',
      date: '2025-03-12',
      ownerId: '1',
    },
    {
      id: '5',
      name: 'Linux',
      overview: 'This is the subtitle',
      date: '2025-03-12',
      ownerId: '1',
    },
    {
      id: '6',
      name: 'Linux',
      overview: 'This is the subtitle',
      date: '2025-03-12',
      ownerId: '1',
    },
  ];
}
