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
  invitePeople: FormGroup;
    invitedEmails: string[] ;

  invite() {

  }
}
