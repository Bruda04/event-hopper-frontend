import {SimpleLocationDTO} from '../locations/SimpleLocationDTO.model';
import {SimpleEventTypeDTO} from '../eventTypes/SimpleEventTypeDTO.model';

export interface SimpleEventDTO {
  id: string;
  name: string;
  description: string;
  time: string;
  picture: string;
  eventType: SimpleEventTypeDTO;
  location: SimpleLocationDTO;
}
