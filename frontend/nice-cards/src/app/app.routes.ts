import { Routes } from '@angular/router';
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
  // {
  //   path: 'login/success',
  //   loadComponent: () =>
  //     import('@features/login/components/login-success/login-success.component').then(
  //       (c) => c.LoginSuccessComponent
  //     ),
  // },
  {
    path: 'login/failure',
    loadComponent: () =>
      import('@features/login/components/login-failure/login-failure.component').then(
        (c) => c.LoginFailureComponent
      ),
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
