import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, of, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(AuthService)
    .checkIsAuthenticated()
    .pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigateByUrl('/login');
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
