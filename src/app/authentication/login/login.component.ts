import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service'; // Import the service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: any;
  password: any;
  hidePassword = true;  // Variable to toggle password visibility


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('.*[A-Z].*'),
        Validators.pattern('.*[0-9].*')
      ])
    });


  constructor(private loginService: LoginService, private router: Router) { }
  onSubmit() {
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;
  
      this.loginService.loginUser(this.email, this.password).subscribe(
        (user) => {
          console.log(user);
          if (user) {
            this.router.navigate(['/home'], { state: { user } });
          } else {
            console.log('Invalid credentials!');
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
}