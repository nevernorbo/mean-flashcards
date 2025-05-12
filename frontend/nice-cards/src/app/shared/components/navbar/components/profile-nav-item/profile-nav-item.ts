import {
  Component,
  computed,
  ElementRef,
  OnInit,
  Renderer2,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PublicUser } from '@core/auth/models/user.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { ProfileService } from '@features/profile/service/profile.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  LogOut,
  LucideAngularModule,
  User,
  UserCog,
  UserPen,
} from 'lucide-angular';

@Component({
  selector: 'profile-nav-item',
  imports: [LucideAngularModule, ButtonComponent],
  templateUrl: 'profile-nav-item.component.html',
})
export class ProfileNavItemComponent implements OnInit {
  userPreview = signal<PublicUser | null>(null);
  dropdownOpen = signal(false);

  readonly User = User;
  readonly LogOut = LogOut;
  readonly UserCog = UserCog;
  readonly UserPen = UserPen;

  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    // Close the dropdown panel if the user clicks outside of it
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton.nativeElement &&
        this.menu &&
        e.target !== this.menu.nativeElement
      ) {
        this.dropdownOpen.set(false);
      }
    });
  }

  ngOnInit() {
    this.userPreview = this.authService.authenticatedUser;
    this.authService.checkAuthStatus();
  }

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  handleLogout() {
    this.authService.logout();
  }

  adminPageClicked() {
    this.router.navigateByUrl('/admin');
  }

  profilePageClicked() {
    if (this.authService.authenticatedUser()?._id) {
      this.router.navigateByUrl(
        `/profile/${this.authService.authenticatedUser()?._id}`
      );
    }
  }
}
