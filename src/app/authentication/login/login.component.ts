import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NavigationStateService } from '../services/navigation-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true; // Variable to toggle password visibility

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('.*[A-Z].*'), // At least one uppercase
      Validators.pattern('.*[0-9].*')  // At least one number
    ])
  });

  constructor(private loginService: LoginService, private navigationStateService: NavigationStateService, private router: Router) {}

  // Getters for easier access in the template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
  
      this.loginService.loginUser(email, password).subscribe(
        (user) => {
          if (user) {
            this.navigationStateService.setUserData(user); // Store user data securely
            this.router.navigate(['/home']);
          } else {
            console.log('Invalid credentials!');
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    }
  }
}
