import {SimpleEventTypeDTO} from '../eventTypes/SimpleEventTypeDTO.model';
import {SimpleLocationDTO} from '../locations/SimpleLocationDTO.model';
import {ConversationPreviewDTO} from '../messages/conversationPreviewDTO.model';

export interface SinglePageEventDTO {
  id: string
  name: string
  description: string
  time: Date
  picture: string
  eventType: SimpleEventTypeDTO
  location: SimpleLocationDTO
  privacy: string
  eventOrganizerLoggedIn: boolean;
  anyEventOrganizerLoggedIn: boolean;
  adminLoggedIn:boolean;
  favorite: boolean;
  conversationInitialization: ConversationPreviewDTO;
}
