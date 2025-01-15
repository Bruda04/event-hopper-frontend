import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VerificationTokenState} from '../../../shared/model/VerificationTokenState.model';
import {VerificationService} from '../../services/registration/verification.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.css'
})
export class EmailVerifiedComponent {
  token: string;
  state: VerificationTokenState;
  newEmailSent = false;
  newEmailRequested = false;
  isLoading = true;


  constructor(private route: ActivatedRoute, private verificationService: VerificationService
  , private userService: UserService) { }

  ngOnInit(): void {
    this.userService.clearToken();
    this.isLoading = true;
    this.token = this.route.snapshot.paramMap.get('token');

    this.verificationService.verifyToken(this.token).subscribe({
      next: (state) => {
        this.state = state;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.state = VerificationTokenState.MISSING;
        console.error('Error finding email', err);
      },
    });

  }


  protected readonly VerificationTokenState = VerificationTokenState;
}
