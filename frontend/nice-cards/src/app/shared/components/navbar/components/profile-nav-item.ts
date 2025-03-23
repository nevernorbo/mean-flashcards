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
import { LogOut, LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'profile-nav-item',
  imports: [LucideAngularModule],
  template: `
    <div class="align-center flex">
      <button
        #toggleButton
        class="cursor-pointer m-2 items-center justify-center rounded-full bg-skin-color-surface-pop bg-origin-border text-skin-muted ring-skin-color-primary hover:text-skin-base focus:ring-2"
        (click)="toggleDropdown()"
      >
        @if (userPreview()?.profile?.avatarUrl) {
          <img
            [src]="userPreview()?.profile?.avatarUrl"
            alt="avatar"
            class="size-10 rounded-full p-1"
          />
        } @else {
          <div class="p-2">
            <lucide-icon [img]="User"></lucide-icon>
          </div>
        }
      </button>
      @if (dropdownOpen()) {
        <div
          #menu
          class="absolute right-0 top-0 flex translate-y-1/2 flex-col items-start rounded-md border-2 border-skin-color-primary bg-skin-color-surface-pop p-4 shadow-sm"
        >
          <div class="mb-2 flex border-b border-skin-color-faintest py-2">
            <div class="mr-3 text-nowrap text-skin-muted">Logged in as</div>
            <div class="max-w-28 truncate">
              {{ userPreview()?.profile?.username }}
            </div>
          </div>
          <button
            (click)="handleLogout()"
            class="border-1 flex w-full items-center justify-center rounded-md bg-skin-color-surface/85 py-1 text-center shadow-sm hover:border-skin-color-primary hover:bg-skin-color-faintest"
          >
            <lucide-icon [img]="LogOut" size="18"></lucide-icon>
            <span class="ml-4"> Logout </span>
          </button>
        </div>
      }
    </div>
  `,
})
export class ProfileNavItemComponent {
  userPreview: Signal<PublicUser | null>;
  dropdownOpen = signal(false);

  readonly User = User;
  readonly LogOut = LogOut;

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
}
