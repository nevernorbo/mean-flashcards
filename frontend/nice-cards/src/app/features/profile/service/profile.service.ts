import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { PublicUser } from '@core/auth/models/user.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { EditProfileForm } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  $user = signal<PublicUser>({} as PublicUser);

  private profileUrl = 'http://localhost:5200/api/profile';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  fetchUser(id: string) {
    this.http
      .get<PublicUser>(`${this.profileUrl}/${id}`, {
        withCredentials: true,
      })
      .subscribe((user) => this.$user.set(user));
  }

  updateProfile(editProfileForm: EditProfileForm) {
    return this.http.patch(
      `${this.profileUrl}/${this.$user()._id}`,
      { editProfileForm: editProfileForm },
      { withCredentials: true, responseType: 'text' }
    );
  }

  deleteUser() {
    this.http
      .delete(`${this.profileUrl}/${this.$user()._id}`, {
        withCredentials: true,
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.authService.logout();
          console.log(response);
        },
        error: (error) => {
          console.log('Profile delete unsuccessful: ', error);
        },
      });
  }
}
