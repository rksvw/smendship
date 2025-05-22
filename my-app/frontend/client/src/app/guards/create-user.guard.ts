import { CanActivateFn } from '@angular/router';

export const createUserGuard: CanActivateFn = () => {
  try {
    // Allow access to everyone
    return true;
  } catch (error) {
    console.error('Error in createUserGuard:', error);
    return true; // Allow access on error
  }
};