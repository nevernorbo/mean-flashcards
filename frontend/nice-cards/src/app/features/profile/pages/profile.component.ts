import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicUser } from '@core/auth/models/user.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { LucideAngularModule, User } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { ProfileService } from '../service/profile.service';
import { ProfileEditingViewComponent } from "../components/profile-editing-view/profile-editing-view.component";
import { ProfileNormalViewComponent } from "../components/profile-normal-view/profile-normal-view.component";

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, ProfileEditingViewComponent,
    ProfileNormalViewComponent
],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly User = User;

  sub: Subscription = new Subscription();
  user = signal<PublicUser | null>(null);

  editing = signal<boolean>(false);

  isOwnProfile = computed<boolean>(() => {
    if (this.authService.authenticatedUser()?._id === this.user()?._id) {
      return true;
    }
    return false;
  });

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      const userId = params['id'];

      if (!userId) {
        alert('No user id provided');
        return;
      }

      this.user = this.profileService.$user;
      this.profileService.fetchUser(userId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editingBegan() {
    this.editing.set(true);
  }

  editingFinished() {
    this.editing.set(false);
  }
}
