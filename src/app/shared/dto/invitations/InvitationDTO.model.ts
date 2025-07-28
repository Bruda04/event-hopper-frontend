import {SimpleEventDTO} from '../events/simpleEventDTO.model';

export interface InvitationDTO {
  id:string
  targetEmail: string
  timestamp: Date
  status: string
  picture: string
  event: SimpleEventDTO

}
