import {
  Component,
  computed,
  ElementRef,
  Renderer2,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PublicUser } from '@core/auth/models/user.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LogOut, LucideAngularModule, User, UserCog } from 'lucide-angular';

@Component({
  selector: 'profile-nav-item',
  imports: [LucideAngularModule, ButtonComponent],
  templateUrl: 'profile-nav-item.component.html',
})
export class ProfileNavItemComponent {
  userPreview: Signal<PublicUser | null>;
  dropdownOpen = signal(false);

  readonly User = User;
  readonly LogOut = LogOut;
  readonly UserCog = UserCog;

  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.userPreview = computed(() => this.authService.authenticatedUser());

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

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.isAuthenticated.set(false);
        this.authService.authenticatedUser.set(null);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log('Error logging out: ', error);
      },
    });
  }

  adminPageClicked() {
    this.router.navigateByUrl('/admin');
  }
}
