import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Event } from '../model/event.model';
import {EventDTO} from '../model/eventDTO.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  // @Input()
  // event: Event;

  @Input() event: EventDTO;

  @Output()
  clicked: EventEmitter<EventDTO> = new EventEmitter<EventDTO>();

  onCardClicked(): void {
    this.clicked.emit(this.event)
  }

}
