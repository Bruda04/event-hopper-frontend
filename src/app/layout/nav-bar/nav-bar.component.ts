import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStateService } from '../../authentication/services/navigation-state.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoginRoute: boolean = false;
  isRegisterRoute: boolean = false;
  isHomeRoute: boolean = false;
  user:any;
  loggedIn: boolean = false;

  constructor(private router: Router, private navigationStateService: NavigationStateService) {
    // Listen for route changes
    this.router.events.subscribe(() => {
      this.user = this.navigationStateService.getUserData();
      if(this.user != null){
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
      this.isLoginRoute = this.router.url === '/login';
      this.isRegisterRoute = this.router.url === '/register';
      this.isHomeRoute = this.router.url === '/home';
      this.isHomeRoute = this.router.url === '/';

    });
  }

  
}
