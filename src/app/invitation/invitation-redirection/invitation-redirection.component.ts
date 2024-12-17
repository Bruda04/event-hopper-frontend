import { Component } from '@angular/core';
import {EventService} from '../../event/event.service';
import {InvitationService} from '../invitation.service';
import {ProfileService} from '../../profile/profile.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import { InvitationDTO } from '../../shared/dto/invitations/InvitationDTO.model';
import {SimpleAccountDTO} from '../../shared/dto/users/account/SimpleAccountDTO.model';


@Component({
  selector: 'app-invitation-redirection',
  templateUrl: './invitation-redirection.component.html',
  styleUrl: './invitation-redirection.component.css'
})
export class InvitationRedirectionComponent {
  invitationId: string | null = null;
  invitation: InvitationDTO | null = null;
  account: SimpleAccountDTO | null = null;

  constructor(private invitationService: InvitationService,
              private eventService: EventService,
              private profileService: ProfileService,
              private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.invitationId = this.route.snapshot.paramMap.get('id');
    console.log('Invitation ID:', this.invitationId);

    // Dobavljanje pozivnice
    this.invitationService.getInvitation(this.invitationId).subscribe({
      next: data => {
        console.log('Invitation Data:', data);
        this.invitation = data;

        // Tek kada imamo invitation, možemo dobaviti profil
        this.profileService.getProfileByEmail(this.invitation.targetEmail).subscribe({
          next: profileData => {
            console.log('Profile Data:', profileData);
            this.account = profileData;

            //logika za login
          },
          error: err => {
            if(err.status ===404){
              console.log("No account found, redirecting to registration...");
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
