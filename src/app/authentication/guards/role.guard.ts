import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  // Get the user role from localStorage
  const userRole = localStorage.getItem('userRole');

  // The required role for this route (pass in route data)
  const requiredRole = route.data['role'];

  // If the user's role matches the required role, allow navigation
  if (userRole === requiredRole) {
    return true;
  }

  // If the user doesn't have the required role, redirect to the home page or login
  const router = inject(Router);
  router.navigate(['/home']);
  return false;
};
