import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoginRoute: boolean = false;
  isRegisterRoute: boolean = false;

  constructor(private router: Router) {
    // Listen for route changes
    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url === '/login';
      this.isRegisterRoute = this.router.url === '/register';

    });
  }

  
}
