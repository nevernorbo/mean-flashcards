import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginForm, RegisterForm } from '../models/auth.interface';
import { PublicUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);
  authenticatedUser = signal<PublicUser | null>(null);

  private authUrl = 'http://localhost:5200/api/auth';

  private loginUrl = `${this.authUrl}/login`;
  // private loginWithGoogleUrl = `${this.authUrl}/google`;

  private registerUrl = `${this.authUrl}/signup`;
  private logoutUrl = `${this.authUrl}/logout`;

  private authenticatedUserUrl = `${this.authUrl}/authenticatedUser`;
  private checkAuthStatusUrl = `${this.authUrl}/checkAuthStatus`;
  private checkIsAuthenticatedUrl = `${this.authUrl}/isAuthenticated`;

  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http.post(this.loginUrl, loginForm, {
      withCredentials: true,
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
    return this.http.get<{ isAuthenticated: boolean; user: any }>(
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
}
