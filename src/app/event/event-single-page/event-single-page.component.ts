import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvitePeopleComponent} from '../../invitation/invite-people/invite-people.component';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';
import {SimpleEventDTO} from '../../shared/dto/events/simpleEventDTO.model';
import {EventDTO} from '../../shared/dto/events/eventDTO.model';
import {environment} from '../../../env/envirements';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-single-page',
  templateUrl: './event-single-page.component.html',
  styleUrl: './event-single-page.component.css'
})
export class EventSinglePageComponent {
  id: string;
  eventDetails: EventDTO;
  location: string;
  image: string;
  time: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Event ID', this.id);
    this.eventService.getEvent(this.id).subscribe({
      next: (event) => {
        console.log('Event found', event);
        this.image = environment.apiImagesHost + event.picture;
        let datePipe = new DatePipe('en-US');
        this.time = datePipe.transform(event.time, 'HH:mm, dd.MM.yyyy');
        this.eventDetails = event
        this.location = event.location.address + ", " + event.location.city;
      },
      error: (err) => {
        console.error('Error finding event', err);
      },
    });

  }


  openInviteModal() {
    const dialogRef: MatDialogRef<InvitePeopleComponent> = this.dialog.open(InvitePeopleComponent, {
      minWidth: '70vw',
      maxWidth: '70vw',
      minHeight: '70vh',
      maxHeight: '70vh',
    });

  }
}
