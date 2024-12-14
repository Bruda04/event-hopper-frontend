import {Component, Inject, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


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

  invite() {

  }

  addEmail(): void {
    const email = this.inviteForm.get('email')?.value;
    if (email && email.trim() !== '') {
      this.invitedEmails.push(email.trim());
      this.inviteForm.reset(); // Očisti input polje

    }
  }

  // Brisanje emaila iz liste
  removeEmail(email: string): void {
    let index = this.invitedEmails.indexOf(email);
    this.invitedEmails.splice(index, 1);
  }
}
