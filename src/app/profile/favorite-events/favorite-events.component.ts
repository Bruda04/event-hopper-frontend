import {Component, Input} from '@angular/core';
import {EventDTO} from '../../shared/dto/events/eventDTO.model';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {EventService} from '../../event/event.service';

@Component({
  selector: 'app-favorite-events',
  templateUrl: './favorite-events.component.html',
  styleUrl: './favorite-events.component.css'
})
export class FavoriteEventsComponent {
  events: EventDTO[];
  @Input() favoriteEvents: any[] = [];
  eventPageProperties = {
    page: 0,
    pageSize: 10,
    totalCount: 0
  };

  constructor(private eventService: EventService) {
  }



}
