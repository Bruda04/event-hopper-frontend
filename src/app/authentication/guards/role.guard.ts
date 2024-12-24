import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';

export const roleGuard: CanActivateFn = (route, state) => {
  // Get the user role from localStorage


  const userService = inject(UserService);

  const userRole = userService.getUserData()?.role;

  // The required role for this route (pass in route data)
  const requiredRoles = route.data['roles'];

  // If the user's role matches the required role, allow navigation
  if (requiredRoles && requiredRoles.includes(userRole)) {
    return true;
  }

  // If the user doesn't have the required role, redirect to the home page or login
  const router = inject(Router);
  router.navigate(['/home']);
  return false;
};
