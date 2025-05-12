import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NotificationComponent } from './shared/components/notification/components/notification.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    LucideAngularModule,
    NotificationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /* 
    Make sure to set the 'authenticated' signal in the authService to true if the user is already in the session
    Here because the user might reload on a different route than 'home'
  */
  constructor(private authService: AuthService) {
    this.authService.checkAuthStatus();
  }
}
