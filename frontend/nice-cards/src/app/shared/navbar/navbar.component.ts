import { Component, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  Menu,
  Spade,
  X,
  MoonStar,
  Sun,
} from 'lucide-angular';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, RouterModule, NgClass],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  currentTheme: string = 'light';
  mobileNavigationIsOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (
      !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      localStorage['theme'] = 'dark';
    } else {
      this.currentTheme = localStorage.getItem('theme')!;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  readonly Menu = Menu;
  readonly Spade = Spade;
  readonly X = X;
  readonly MoonStar = MoonStar;
  readonly Sun = Sun;

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

  getAllNavigationItems = () => this.leftSideNavigationItems.concat(this.guestNavigationItems)

  toggleMobileNavigation = () => {
    this.mobileNavigationIsOpen = !this.mobileNavigationIsOpen;
  };

  toggleTheme = () => {
    if (this.currentTheme === 'light') {
      localStorage['theme'] = 'dark';
      this.currentTheme = 'dark';
    } else {
      localStorage['theme'] = 'light';
      this.currentTheme = 'light';
    }

    document.documentElement.classList.toggle(
      'dark',
      localStorage['theme'] === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  };
}

type NavigationItem = {
  title: string;
  route: string;
};
