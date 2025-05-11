import { Routes } from '@angular/router';
import { adminGuard } from '@core/auth/guards/admin.guard';
import { authGuard } from '@core/auth/guards/auth.guard';
import { HomeComponent } from '@features/home/pages/home/home.component';

export const routes: Routes = [
  {
    path: 'collections',
    loadComponent: () =>
      import(
        '@features/collections/pages/collections/collections.component'
      ).then((c) => c.CollectionsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'collection/new',
    loadComponent: () =>
      import(
        '@features/collections/pages/new-collection/new-collection.component'
      ).then((c) => c.NewCollectionComponent),
    canActivate: [authGuard],
  },
  {
    path: 'collection/:id',
    loadComponent: () =>
      import(
        '@features/collections/pages/collection/collection.component'
      ).then((c) => c.CollectionComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('@features/profile/pages/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('@features/admin/pages/admin.component').then(
        (c) => c.AdminComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'login/failure',
    loadComponent: () =>
      import(
        '@features/login/components/login-failure/login-failure.component'
      ).then((c) => c.LoginFailureComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@features/login/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@features/register/pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  { path: '', component: HomeComponent },
  {
    path: '**',
    loadComponent: () =>
      import('@shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
