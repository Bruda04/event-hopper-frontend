import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvitePeopleComponent} from '../../invitation/invite-people/invite-people.component';

@Component({
  selector: 'app-event-single-page',
  templateUrl: './event-single-page.component.html',
  styleUrl: './event-single-page.component.css'
})
export class EventSinglePageComponent {

  constructor(public dialog: MatDialog,) {
  }
  eventDetails = {
    name: 'Jen and John’s Wedding',
    description:
      'Specializing in a wide variety of candles, from scented and decorative to hand-poured artisanal pieces. Here, customers can explore unique fragrances, seasonal collections, and candle accessories to create a warm and relaxing ambiance at home.',
    location: 'BlackStone Hall, New York',
    time: '12:00–22:00 ET',
    type: 'Public',
  };

  openInviteModal() {
    const dialogRef: MatDialogRef<InvitePeopleComponent> = this.dialog.open(InvitePeopleComponent, {
      minWidth: '70vw',
      maxWidth: '70vw',
      minHeight: '70vh',
      maxHeight: '70vh',
    });


  }
}
