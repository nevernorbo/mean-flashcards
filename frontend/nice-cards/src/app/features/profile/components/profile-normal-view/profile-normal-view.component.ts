import { DatePipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicUser } from '@core/auth/models/user.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { ProfileService } from '@features/profile/service/profile.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { OutlinedButtonComponent } from '@shared/components/button/outlined-button.component';
import { LucideAngularModule, User } from 'lucide-angular';
import { ConfirmPopupComponent } from '../../../../shared/components/confirm-popup/confirm-popup';

@Component({
  selector: 'profile-normal-view',
  imports: [
    LucideAngularModule,
    DatePipe,
    ButtonComponent,
    OutlinedButtonComponent,
    ConfirmPopupComponent,
  ],
  templateUrl: './profile-normal-view.component.html',
})
export class ProfileNormalViewComponent {
  readonly User = User;

  user = input<PublicUser | null>(null);
  editingBegan = output();

  isOwnProfile = input();

  showDeletePopup = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  editClicked() {
    this.editingBegan.emit();
  }

  deleteClicked() {
    this.showDeletePopup.set(true);
  }

  deleteCancelled() {
    this.showDeletePopup.set(false);
  }

  deleteConfirmed() {
    this.profileService.deleteUser();
  }
}
