import { Component, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'login-success',
  imports: [],
  templateUrl: './login-success.component.html',
  styles: `
    :host {
      margin: auto;
    }
  `,
})
export class LoginSuccessComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  secondsToReroute = signal(5);

  private timeoutId: any;
  private intervalId: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.checkAuthStatus().subscribe({
      next: (response) => {
        this.authService.isAuthenticated.set(response.isAuthenticated);
        this.authService.authenticatedUser.set(response.user);
        
        this.intervalId = setInterval(() => {
          this.secondsToReroute.update((value) => value - 1);
        }, 1000);
        
        this.timeoutId = setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 4500);

        console.log('Login through third party successful: ', response);
      },
      error: (error) => {
        console.log('Login failed: ', error);
      },
    });
  }

  ngOnDestroy() {
    // Cleanup timers on the chance that the user has navigated away early
    clearInterval(this.timeoutId);
    clearTimeout(this.intervalId);

    // Cleanup subscription
    this.destroy$.next();
    this.destroy$.complete();
  }
}
