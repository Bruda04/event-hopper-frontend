import { Component } from '@angular/core';
import {EventService} from '../../event/event.service';
import {InvitationService} from '../invitation.service';
import {ProfileService} from '../../profile/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { InvitationDTO } from '../../shared/dto/invitations/InvitationDTO.model';
import {SimpleAccountDTO} from '../../shared/dto/users/account/SimpleAccountDTO.model';
import {UserService} from '../../authentication/services/user.service';


@Component({
  selector: 'app-invitation-redirection',
  templateUrl: './invitation-redirection.component.html',
  styleUrl: './invitation-redirection.component.css'
})
export class InvitationRedirectionComponent {
  invitationId: string | null = null;
  invitation: InvitationDTO | null = null;
  account: SimpleAccountDTO | null = null;
  person: any;
  event: any;
  user: any;

  constructor(private invitationService: InvitationService,
              private eventService: EventService,
              private profileService: ProfileService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
  ) {}


  ngOnInit(): void {
    this.invitationId = this.route.snapshot.paramMap.get('id');
    console.log('Invitation ID:', this.invitationId);

    this.invitationService.getInvitation(this.invitationId).subscribe({
      next: data => {
        console.log('Invitation Data:', data);
        this.invitation = data;

        this.profileService.getProfileByEmail(this.invitation.targetEmail).subscribe({
          next: profileData => {
            console.log('Profile Data:', profileData);
            this.account = profileData;
            this.user = this.userService.getUserData();

            if (this.user) {
              this.profileService.getPerson(this.user.id).subscribe({
                next: person => {
                  this.person = person;
                  this.profileService.addAttending(this.invitation.event.id).subscribe({
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
                  this.router.navigate(['/profil']);

                },
                error: err => {
                  console.error('Error getting person data:', err);
                }
              });
            }else{
              this.router.navigate(['/login'], { queryParams: { invitationId: this.invitationId } });
            }

          },
          error: err => {
            if(err.status ===404){
              this.router.navigate(['/register-user'], { queryParams: { invitationId: this.invitationId } });
            }else{
              console.error('Error getting profile:', err);
            }
          }
        });
      },
      error: err => {
        console.error('Error getting invitation:', err);
      }
    });
  }

}
