import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Menu, Spade, X } from 'lucide-angular';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  mobileNavigationIsOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  readonly Menu = Menu;
  readonly Spade = Spade;
  readonly X = X;

  navigationItems: NavigationItem[] = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Collections',
      route: '/collections',
    },
    {
      title: 'Login',
      route: '/login',
    },
    {
      title: 'Sign up',
      route: '/register',
    },
  ];

  toggleMobileNavigation = () => {
    this.mobileNavigationIsOpen = !this.mobileNavigationIsOpen;
  };
}

type NavigationItem = {
  title: string;
  route: string;
};
