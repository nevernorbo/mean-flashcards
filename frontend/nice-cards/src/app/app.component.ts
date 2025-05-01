import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /* 
    Make sure to set the 'authenticated' signal in the authService to true if the user is already in the session
    Here because the user might reload on a different route than 'home'
  */
  constructor(private authService: AuthService) {
    this.authService.checkAuthStatus().subscribe({
      next: (response) => {
        this.authService.isAuthenticated.set(response.isAuthenticated);
        this.authService.authenticatedUser.set(response.user);
      },
      error: (error) => {
        console.log('Error trying to get authenticated user: ', error);
      },
    });
  }
}
