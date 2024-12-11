import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {LoginService} from '../services/login/login.service';
import {LoginDTO} from '../model/account/LoginDTO.model';

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

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) {}

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
      const loginDTO: LoginDTO = {
        email:this.loginForm.value.email,
        password: this.loginForm.value.password
      }


      this.loginService.loginUser(loginDTO).subscribe({
        next: (response) => {
          console.log('User logged successfully:', response);
          this.userService.storeUserData(response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loginErrorMessage = 'Account not found, please try again.';
          console.error('Login error:', err);
        },
      });

    }
  }
}
