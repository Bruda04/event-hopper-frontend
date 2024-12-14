import { Component } from '@angular/core';
import {InvitePeopleComponent} from '../../invitation/invite-people/invite-people.component';
import {MatDialog, MatPaginator, MatSort} from '../../infrastructure/material/material.module';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-event-single-page',
  templateUrl: './event-single-page.component.html',
  styleUrl: './event-single-page.component.css'
})
export class EventSinglePageComponent {

  constructor(public dialog:MatDialog) {
  }

  eventDetails = {
    name: 'Jen and John’s Wedding',
    description:
      'Specializing in a wide variety of candles, from scented and decorative to hand-poured artisanal pieces. Here, customers can explore unique fragrances, seasonal collections, and candle accessories to create a warm and relaxing ambiance at home.',
    location: 'BlackStone Hall, New York',
    time: '12:00–22:00 ET',
    type: 'Public',
  };

  invite() {
    const dialogRef: MatDialogRef<InvitePeopleComponent> = this.dialog.open(InvitePeopleComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
    });
    dialogRef.afterClosed().subscribe();
  }
}
