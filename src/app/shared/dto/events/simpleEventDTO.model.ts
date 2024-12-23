import {EventType} from '@angular/router';
import {SimpleLocationDTO} from '../locations/SimpleLocationDTO.model';

export interface SimpleEventDTO {
  id: string;
  name: string;
  description: string;
  time: string;
  picture: string;
  eventType: EventType;
  location: SimpleLocationDTO;
}
