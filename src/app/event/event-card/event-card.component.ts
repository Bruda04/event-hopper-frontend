import { Component, Input, EventEmitter, Output } from '@angular/core';
import {EventDTO} from '../../shared/dto/events/eventDTO.model';
import {environment} from '../../../env/envirements';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input() event: EventDTO;

  @Output()
  clicked: EventEmitter<EventDTO> = new EventEmitter<EventDTO>();


  onCardClicked(): void {
    this.clicked.emit(this.event)
  }

  protected readonly environment = environment;
}
