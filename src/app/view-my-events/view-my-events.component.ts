import { Component } from '@angular/core';
import {EventService} from '../event/event.service';
import {EventDTO} from '../shared/dto/events/eventDTO.model';

@Component({
  selector: 'app-view-my-events',
  templateUrl: './view-my-events.component.html',
  styleUrl: './view-my-events.component.css'
})
export class ViewMyEventsComponent {
  myEvents: EventDTO[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.loadEvents();

  }

  loadEvents(): void {
    this.eventService.getOrganizerEvents().subscribe({
      next: (events) => {
        this.myEvents = events;

      },
      error: () :void=>{
        console.log('Error finding events');
      },
    });
  }

}
