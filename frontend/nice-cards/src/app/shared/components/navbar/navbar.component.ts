import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, Spade, X } from 'lucide-angular';
import { ToggleThemeButtonComponent } from './toggle-theme-button';

@Component({
  selector: 'app-navbar',
  imports: [
    LucideAngularModule,
    RouterModule,
    NgClass,
    ToggleThemeButtonComponent,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  currentRoute = signal('');
  mobileMenuIsOpen = signal(false);

  constructor(private router: Router) {}

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
    return this.leftSideNavigationItems.concat(this.guestNavigationItems);
  }

  toggleMobileMenu() {
    this.mobileMenuIsOpen.set(!this.mobileMenuIsOpen());
  };
}

type NavigationItem = {
  title: string;
  route: string;
};
