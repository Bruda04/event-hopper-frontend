import {SimpleEventTypeDTO} from '../eventTypes/simpleEventTypeDTO.model';
import {SimpleLocationDTO} from '../locations/SimpleLocationDTO.model';

export interface EventDTO{
  id: string
  name: string
  description: string
  time: Date
  picture: string
  eventType: SimpleEventTypeDTO
  location: SimpleLocationDTO

}
