import {Component, Inject, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InvitationService} from "../invitation.service";
import {CreateInvitationDTO} from "../../shared/dto/invitations/CreateInvitationDTO.model";
import {SimpleEventDTO} from "../../shared/dto/events/simpleEventDTO.model";
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
              ) {
  }

  // invite():void {
  //     this.invitedEmails.forEach((email) => {
  //       let event: EventDTO;
  //
  //       this.eventService.getEvent("3f7b2c9e-4a6f-4d5b-b8c1-7a2f9e3b6d4a").subscribe(
  //           {
  //             next: (response) =>
  //                 {
  //                   event = response;
  //                 }
  //               ,
  //                 error:() => {
  //                   console.error('Error occurred while fetching event:');
  //                 }
  //           });
  //
  //       let createInvitationDTO: CreateInvitationDTO = {
  //         targetEmail: email,
  //         picture:"",
  //         event: event   //kada se implementira event single page treba dodati ovde pravi objekat
  //        //event: new SimpleEventDTO()
  //       }
  //
  //       this.invitationService.create(createInvitationDTO).subscribe(
  //           {
  //             next: () => {
  //               console.log("create invitation DTO");
  //             },
  //             error: () => {
  //               console.error('Error adding service');
  //             }
  //           } );
  //     })
  // }

  async invite(): Promise<void> {
    for (let email of this.invitedEmails) {
      try {
        // Čekamo da dobijemo event pre nego što nastavimo
        // let event: EventDTO = await this.eventService.getEvent("3f7b2c9e-4a6f-4d5b-b8c1-7a2f9e3b6d4a");  // Pozivamo funkciju koja vraća Promise
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
