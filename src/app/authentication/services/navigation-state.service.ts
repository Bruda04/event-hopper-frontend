import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationStateService {
  private userData: any = null;

  setUserData(data: any): void {
    this.userData = data;
  }

  getUserData(): any {
    return this.userData;
  }

  clearUserData(): void {
    this.userData = null;
  }
}
