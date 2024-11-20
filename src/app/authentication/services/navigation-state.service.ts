import { Injectable } from '@angular/core';
import { User } from './user.modul';

@Injectable({
  providedIn: 'root',
})
export class NavigationStateService {
  private userData: User = null;

  setUserData(data: User): void {
    this.userData = data;
  }

  getUserData(): User {
    return this.userData;
  }

  clearUserData(): void {
    this.userData = null;
  }
}
