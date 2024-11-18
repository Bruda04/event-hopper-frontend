import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Event } from '../model/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  // @Input()
  // event: Event;

  @Input() event: any;

  @Output()
  clicked: EventEmitter<Event> = new EventEmitter<Event>();

  onWineClicked(): void {
    this.clicked.emit(this.event)
  }

}
