import {SimpleLocationDTO} from '../../locations/SimpleLocationDTO.model';
import {SimpleEventDTO} from '../../events/simpleEventDTO.model';
import {SimpleProductDTO} from '../../solutions/simpleProductDTO';
import {NotificationDTO} from '../../notifications/notificationDTO.model';

export interface ProfileForPersonDTO {
  id: string;
  email: string;
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  location: SimpleLocationDTO;
  attendingEvents:SimpleEventDTO[];
  favoriteEvents: SimpleEventDTO[];
  favoriteProducts: SimpleProductDTO[];
  notifications: NotificationDTO[];
  myEvents: SimpleEventDTO[];
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDescription: string;
  workStart: string;
  workEnd: string;
  companyLocation: SimpleLocationDTO;
  companyPhotos: string[];
}
