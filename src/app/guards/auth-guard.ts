import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const user = sessionStorage.getItem('usuario');

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
