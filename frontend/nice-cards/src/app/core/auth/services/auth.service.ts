import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginForm, RegisterForm } from '../models/auth.interface';
import { PublicUser } from '../models/user.interface';
import { Router } from '@angular/router';

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
    private router: Router
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
        },
        error: (error) => {
          console.log('Login failed: ', error);
        },
      });
  }

  register(registerForm: RegisterForm) {
    return this.http.post(this.registerUrl, registerForm, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  logout() {
    return this.http.post(
      this.logoutUrl,
      {},
      { withCredentials: true, responseType: 'text' }
    );
  }

  checkAuthStatus() {
    return this.http.get<{ isAuthenticated: boolean; user: PublicUser }>(
      this.checkAuthStatusUrl,
      {
        withCredentials: true,
      }
    );
  }

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
