import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStateService } from '../../authentication/services/navigation-state.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoginRoute: boolean = false;
  isRegisterRoute: boolean = false;
  isHomeRoute: boolean = false;
  user: any;
  loggedIn: boolean = false;

  constructor(
    private router: Router, 
    private navigationStateService: NavigationStateService,
    private cdr: ChangeDetectorRef  
  ) {
    // Listen for route changes
    this.router.events.subscribe(() => {
      this.user = this.navigationStateService.getUserData();
      if (this.user != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      this.isLoginRoute = this.router.url === '/login';
      this.isRegisterRoute = 
        this.router.url === '/register' ||
        this.router.url === '/register-organizer' ||
        this.router.url === '/register-pup';
      this.isHomeRoute = 
        this.router.url === '/home' ||
        this.router.url === '/';
    });
  }

  logout() {
    this.loggedIn = false;
    this.navigationStateService.setUserData(null);
    this.user = null;
    this.router.navigate(['/login']);  // Redirect to login after logout

    // Manually trigger change detection to update the view
    this.cdr.detectChanges();
  }
}
