import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginForm, RegisterForm } from '../models/auth.interface';
import { PublicUser } from '../models/user.interface';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/components/notification/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);
  authenticatedUser = signal<PublicUser | null>(null);

  private authUrl = 'http://localhost:5200/api/auth';

  private loginUrl = `${this.authUrl}/login`;

  private registerUrl = `${this.authUrl}/signup`;
  private logoutUrl = `${this.authUrl}/logout`;

  private checkAuthStatusUrl = `${this.authUrl}/checkAuthStatus`;
  private checkIsAuthenticatedUrl = `${this.authUrl}/isAuthenticated`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(loginForm: LoginForm) {
    this.http
      .post<PublicUser>(this.loginUrl, loginForm, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.authenticatedUser.set(response);
          this.router.navigateByUrl('/');
          this.notificationService.show('You are logged in!', 'success');
        },
        error: (error) => {
          this.notificationService.show(error.error.errorMessage, 'error');
        },
      });
  }

  register(registerForm: RegisterForm) {
    this.http
      .post(this.registerUrl, registerForm, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          this.router.navigateByUrl('/login');
          this.notificationService.show(response.successMessage, 'success');
        },
        error: (error) => {
          this.notificationService.show(error.error.errorMessage, 'error');
        },
      });
  }

  logout() {
    this.http.post(this.logoutUrl, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.isAuthenticated.set(false);
        this.authenticatedUser.set(null);
        this.router.navigateByUrl('/');
        this.notificationService.show('Successfully logged out', 'success');
      },
      error: (error) => {
        console.log('Error logging out: ', error);
        this.notificationService.show(error.error.errorMessage, 'error');
      },
    });
  }

  checkAuthStatus() {
    this.http
      .get<{ isAuthenticated: boolean; user: PublicUser }>(
        this.checkAuthStatusUrl,
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: (response) => {
          this.isAuthenticated.set(response.isAuthenticated);
          this.authenticatedUser.set(response.user);
        },
        error: (error) => {
          console.log('Error trying to get authenticated user: ', error);
        },
      });
  }

  // Used by the auth guard
  checkAuthStatusRequest() {
    return this.http.get<{ isAuthenticated: boolean; user: PublicUser }>(
      this.checkAuthStatusUrl,
      {
        withCredentials: true,
      }
    );
  }

  // Used by the auth guard
  checkIsAuthenticated() {
    return this.http.get<boolean>(this.checkIsAuthenticatedUrl, {
      withCredentials: true,
    });
  }

  isModeratorOrAdmin() {
    return (
      this.authenticatedUser()?.role === 'admin' ||
      this.authenticatedUser()?.role === 'moderator'
    );
  }
}
