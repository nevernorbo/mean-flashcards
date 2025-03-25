import { Component } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService) {
    if (!this.authService.isAuthenticated()) {
      this.authService.checkAuthStatus().subscribe({
        next: (response) => {
          this.authService.isAuthenticated.set(response.isAuthenticated);
          this.authService.authenticatedUser.set(response.user);
          console.log(this.authService.authenticatedUser());
        },
        error: (error) => {
          console.log('Failed to check authentication status: ', error);
        },
      });
    }
  }
}
