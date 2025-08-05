import {Component, Input} from '@angular/core';
import {EventDTO} from '../../shared/dto/events/eventDTO.model';

@Component({
  selector: 'app-favorite-events',
  templateUrl: './favorite-events.component.html',
  styleUrl: './favorite-events.component.css'
})
export class FavoriteEventsComponent {
  @Input() favoriteEvents: any[] = [];
}
