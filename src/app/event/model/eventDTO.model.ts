import {SimpleEventTypeDTO} from '../../admin-dashboard/model/simpleEventTypeDTO.model';
import {SimpleLocationDTO} from './simpleLocationDTO.model';

export interface EventDTO{
  id: string
  name: string
  description: string
  time: Date
  picture: string
  eventType: SimpleEventTypeDTO
  location: SimpleLocationDTO

}
