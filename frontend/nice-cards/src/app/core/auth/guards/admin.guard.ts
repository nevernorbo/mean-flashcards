import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, of, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(AuthService)
    .checkAuthStatus()
    .pipe(
      map((response) => {
        if (!response.isAuthenticated) {
          router.navigateByUrl('/login');
          return false;
        }

        if (response.user.role !== 'admin') {
          router.navigateByUrl('/');

          return false;
        }

        return true;
      }),
      catchError((error) => {
        console.log(error);
        router.navigateByUrl('/login');
        return of(false);
      })
    );
};
