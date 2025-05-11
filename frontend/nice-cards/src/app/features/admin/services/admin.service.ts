import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { PublicUser, UserRoles } from '@core/auth/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  $users = signal<PublicUser[]>([]);

  private adminUrl = 'http://localhost:5200/api/admin';

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.http
      .get<PublicUser[]>(`${this.adminUrl}/users`, {
        withCredentials: true,
      })
      .subscribe((users) => this.$users.set(users));
  }

  changeRole(userId: string, role: UserRoles) {
    this.http
      .post(
        `${this.adminUrl}/changeRole`,
        { userId: userId, role: role },
        { withCredentials: true }
      )
      .subscribe({
        next: (response) => {
          console.log('Changed role successfully: ', response);
        },
        error: (error) => {
          console.log('Role change unsuccessful: ', error);
        },
      });
  }

  deleteUser(userId: string) {
    this.http
      .delete(`${this.adminUrl}/deleteUser/${userId}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.fetchUsers();
          console.log('Successfully deleted user: ', response);
        },
        error: (error) => {
          console.log('User delete unsuccessful: ', error);
        },
      });
  }
}
