import {SimpleEventDTO} from '../events/simpleEventDTO.model';
import {EventDTO} from '../events/eventDTO.model';

export interface CreateInvitationDTO {
  targetEmail: string
  picture : string
  event: EventDTO
  //event: SimpleEventDTO
}
