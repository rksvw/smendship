import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  try {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token) {
      // User is logged in -> redirect away from login page
      router.navigate(['/']);
      return false;
    }

    // User not logged in -> allow access
    return true;
  } catch (error) {
    console.error('Error in loginGuard:', error);
    return true; // Allow access on error
  }
};
