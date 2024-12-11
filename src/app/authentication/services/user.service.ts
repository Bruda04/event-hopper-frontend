import { Injectable } from '@angular/core';
import { User } from './user.modul';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  storeUserData(response: any): void {
    localStorage.setItem('userId', response.id);
    localStorage.setItem('userRole', response.type);
  }

  getUserData(): any {
    return {
      id: localStorage.getItem('userId'),
      role: localStorage.getItem('userRole'),
    };
  }

  clearUserData(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }
}
