import { Injectable } from '@angular/core';
import { User } from './user.modul';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  storeUserData(account: any): void {
    localStorage.setItem('userId', account.id);
    localStorage.setItem('userRole', account.type);
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
