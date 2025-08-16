import {SimpleEventDTO} from '../events/simpleEventDTO.model';
import {SimpleProductDTO} from '../solutions/simpleProductDTO';

export interface NotificationDTO {
  content: string;
  timestamp: Date;
  eventID: string | null;
  productID: string | null;

}
