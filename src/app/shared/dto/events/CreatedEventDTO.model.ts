import {EventPrivacyType} from '../../model/EventPrivacyType.model';

export interface CreatedEventDTO{
  id: string;
  name: string;
  maxAttendance: number;
  description: string;
  eventPrivacyType: EventPrivacyType;
  time: string;
  picture: string;
  eventTypeId: string;
  agendaActivityId: string;
  locationId: string;
  productsIds: string[];
  invitationsIds: string[];
  eventOrganizerId: string;
}
