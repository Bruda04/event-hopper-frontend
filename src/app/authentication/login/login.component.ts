import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationStateService } from '../services/navigation-state.service';
import {LoginService} from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true; // Variable to toggle password visibility
  loginErrorMessage: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
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
            this.loginErrorMessage = 'Provided credentials dont match any users.';
          }
        },
        (error) => {
          this.loginErrorMessage = 'An error occurred. Please try again later.';
          console.error('Login error:', error);
        }
      );
    }
  }
}
