import {SimpleEventTypeDTO} from '../eventTypes/SimpleEventTypeDTO.model';
import {SimpleLocationDTO} from '../locations/SimpleLocationDTO.model';

export interface SinglePageEventDTO {
  id: string
  name: string
  description: string
  time: Date
  picture: string
  eventType: SimpleEventTypeDTO
  location: SimpleLocationDTO
  privacy: string
  eventOrganizerId: string
}
