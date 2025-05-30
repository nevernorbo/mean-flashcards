import { Component, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PublicUser } from '@core/auth/models/user.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { EditProfileForm } from '@features/profile/models/profile';
import { ProfileService } from '@features/profile/service/profile.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { OutlinedButtonComponent } from '@shared/components/button/outlined-button.component';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'profile-editing-view',
  imports: [
    LucideAngularModule,
    ButtonComponent,
    OutlinedButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-editing-view.component.html',
})
export class ProfileEditingViewComponent implements OnInit {
  readonly User = User;

  user = input<PublicUser | null>(null);
  isOwnProfile = input<boolean>();
  editingFinished = output();

  editProfileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      username: [this.user()?.profile?.username, Validators.required],
      email: [this.user()?.email, [Validators.email, Validators.required]],
      bio: [this.user()?.profile.bio],
      avatarUrl: [this.user()?.profile.avatarUrl],
    });
  }

  saveClicked() {
    const editProfileForm = this.editProfileForm.value as EditProfileForm;

    this.profileService.updateProfile(editProfileForm).subscribe({
      next: (response: any) => {
        console.log(response);
        this.editingFinished.emit();
        this.profileService.fetchUser(this.user()!._id);
        this.authService.checkAuthStatus(); // To refresh logged in user
        this.notificationService.show(response.successMessage, 'success');
      },
      error: (error) => {
        console.log('Error while updating profile: ', error);
        this.notificationService.show(error.error.errorMessage, 'error');
      },
    });
  }

  cancelClicked() {
    this.editingFinished.emit();
  }
}
