import {Component, Inject, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InvitationService} from "../invitation.service";
import {CreateInvitationDTO} from "../../shared/dto/invitations/CreateInvitationDTO.model";
import {EventService} from "../../event/event.service";
import {EventDTO} from "../../shared/dto/events/eventDTO.model";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-invite-people',
  templateUrl: './invite-people.component.html',
  styleUrl: './invite-people.component.css'
})

export class InvitePeopleComponent {
  inviteForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  invitedEmails: string[] =[];

  constructor(private invitationService: InvitationService,
              private eventService: EventService,
              private dialogRef: MatDialogRef<InvitePeopleComponent>,
              ) {
  }


  async invite(): Promise<void> {
    for (let email of this.invitedEmails) {
      try {

        //moram cekati da se prvo dobavi event pa onda dalje
         const event: EventDTO = await firstValueFrom(this.eventService.getEvent("3f7b2c9e-4a6f-4d5b-b8c1-7a2f9e3b6d4a"));

        const createInvitationDTO: CreateInvitationDTO = {
          targetEmail: email,
          picture: "",
          event: event,  // Ovde dodajemo učitani event
        };

        // Kreiramo pozivnicu
        await this.invitationService.create(createInvitationDTO).toPromise();
        console.log("Invitation created for:", email);
      } catch (error) {
        console.error('Error creating invitation:', error);
      }
    }

    //this.dialogRef.close();
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
