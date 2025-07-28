import {Component, Inject, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {InvitationService} from "../invitation.service";
import {CreateInvitationDTO} from "../../shared/dto/invitations/CreateInvitationDTO.model";
import {EventService} from "../../event/event.service";
import {EventDTO} from "../../shared/dto/events/eventDTO.model";
import {firstValueFrom} from "rxjs";
import {InviteConfirmationComponent} from '../invite-confirmation/invite-confirmation.component';
import {SinglePageEventDTO} from '../../shared/dto/events/SinglePageEventDTO.model';


@Component({
  selector: 'app-invite-people',
  templateUrl: './invite-people.component.html',
  styleUrl: './invite-people.component.css'
})

export class InvitePeopleComponent {

  inviteForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  invitedEmails: string[] = [];

  isLoading: boolean = false;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              private invitationService: InvitationService,
              private eventService: EventService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<InvitePeopleComponent>,
  ) {

  }


  async invite(): Promise<void> {

    this.isLoading = true;
    let allSuccessful = true;


    try {
      for (let email of this.invitedEmails) {
        try {

          //moram cekati da se prvo dobavi event pa onda dalje
          const event: SinglePageEventDTO = await firstValueFrom(this.eventService.getEvent(this.data.id));

          const createInvitationDTO: CreateInvitationDTO = {
            targetEmail: email,
            picture: "",
            event: event,
          };

          // Kreiramo pozivnicu
          await this.invitationService.create(createInvitationDTO).toPromise();
          console.log("Invitation created for:", email);
        } catch (error) {
          console.error('Error creating invitation:', error);
          allSuccessful = false;
        }
      }

    }finally {
      this.isLoading = false;
      this.dialogRef.close();
      this.dialog.open(InviteConfirmationComponent, {
        width: '500px',
        data :{ success: allSuccessful },
      });
    }

  }

  addEmail(): void {
    const email = this.inviteForm.get('email')?.value;
    if (email && email.trim() !== '') {
      this.invitedEmails.push(email.trim());
      this.inviteForm.reset();

    }
  }

  removeEmail(email: string): void {
    let index = this.invitedEmails.indexOf(email);
    this.invitedEmails.splice(index, 1);
  }
}
