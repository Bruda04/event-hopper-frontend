import {Component, Input} from '@angular/core';
import {SimpleEventDTO} from '../../shared/dto/events/simpleEventDTO.model';

@Component({
  selector: 'app-favorite-events',
  templateUrl: './favorite-events.component.html',
  styleUrl: './favorite-events.component.css'
})
export class FavoriteEventsComponent {
  @Input() favoriteEvents: SimpleEventDTO[] = [];
}
