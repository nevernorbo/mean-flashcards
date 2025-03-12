import { Component } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-collections',
  imports: [LucideAngularModule],
  templateUrl: './collections.component.html',
})
export class CollectionsComponent {
  readonly Search = Search;
}
