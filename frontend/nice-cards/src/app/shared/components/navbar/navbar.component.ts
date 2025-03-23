import { NgClass } from '@angular/common';
import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, Spade, X } from 'lucide-angular';
import { ToggleThemeButtonComponent } from './components/toggle-theme-button';
import { AuthService } from '@core/auth/services/auth.service';
import { ProfileNavItemComponent } from "./components/profile-nav-item";

@Component({
  selector: 'app-navbar',
  imports: [
    LucideAngularModule,
    RouterModule,
    NgClass,
    ToggleThemeButtonComponent,
    ProfileNavItemComponent
],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: Signal<boolean>;
  currentRoute = signal('');
  mobileMenuIsOpen = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isAuthenticated = computed(() => this.authService.isAuthenticated());
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects);
      }
    });
  }

  readonly Menu = Menu;
  readonly Spade = Spade;
  readonly X = X;

  leftSideNavigationItems: NavigationItem[] = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Collections',
      route: '/collections',
    },
  ];

  guestNavigationItems: NavigationItem[] = [
    {
      title: 'Login',
      route: '/login',
    },
    {
      title: 'Sign up',
      route: '/register',
    },
  ];

  getAllNavigationItems() {
    if (this.isAuthenticated()) {
      return this.leftSideNavigationItems;
    }

    return this.leftSideNavigationItems.concat(this.guestNavigationItems);
  }

  toggleMobileMenu() {
    this.mobileMenuIsOpen.set(!this.mobileMenuIsOpen());
  }
}

type NavigationItem = {
  title: string;
  route: string;
};
