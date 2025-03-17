import { Routes } from '@angular/router';
import { CollectionsComponent } from './features/collections/pages/collections/collections.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/login/pages/login/login.component';
import { RegisterComponent } from './features/register/pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
