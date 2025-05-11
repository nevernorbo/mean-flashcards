import { DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { PublicUser, UserRoles } from '@core/auth/models/user.interface';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'admin-view',
  imports: [LucideAngularModule, ButtonComponent, DatePipe],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  users$ = signal<PublicUser[]>([]);

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.users$ = this.adminService.$users;
    this.adminService.fetchUsers();
  }

  deleteUser(userId: string) {
    this.adminService.deleteUser(userId);
  }

  selectChanged(userId: string, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value as UserRoles;

    this.adminService.changeRole(userId, selectedValue);
  }
}
