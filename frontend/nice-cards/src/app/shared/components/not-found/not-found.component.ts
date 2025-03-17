import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Home } from 'lucide-angular';

@Component({
  selector: 'app-not-found',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  readonly Home = Home;
}
