import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import {LoginService} from '../services/login/login.service';
import {LoginDTO} from '../../shared/dto/users/account/LoginDTO.model';
import {LoginResponse} from '../../shared/dto/users/account/LoginResponse.model';
import {WebSocketService} from '../services/web-sockets/web-socket.service';
import {InvitationService} from '../../invitation/invitation.service';
import {ProfileService} from '../../profile/profile.service';

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

  invitationId: string;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private profileService: ProfileService,
              private invitationService: InvitationService,
              private webSocketService: WebSocketService,
              private router: Router,
              private route: ActivatedRoute ,) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.invitationId = params['invitationId'];
    });
  }

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
        next: (response:LoginResponse) => {
          if(response.success){
            this.userService.storeToken(response.token);
            this.webSocketService.initConnection();
            if (this.invitationId){
              //this.router.navigate(['/invitation-redirect'], { queryParams: { invitationId: this.invitationId } });
              this.addAttendingEventOnLogin(this.invitationId);
              console.log("login")
            }
              this.router.navigate(['/home']);

          }else{
            this.loginErrorMessage = response.message;
          }

        },
        error: (err: { error?: { message?: string } }) => {
          this.loginErrorMessage = err.error.message;
        },
      });

    }
  }

  addAttendingEventOnLogin(invitationId: string): void {
    this.invitationService.getInvitation(invitationId).subscribe({
      next : invitation => {
        invitation = invitation;
        this.profileService.addAttending(invitation.event.id).subscribe({
          next: (response) => {
            console.log('Event successfully added to attending:', response);
          },
          error: (err) => {
            console.error('Error adding event to attending:', err);
          },
          complete: () => {
            console.log('Attending event request completed.');
          }
        });

      }
    })
  }
}
