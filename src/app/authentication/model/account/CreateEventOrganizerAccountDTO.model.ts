import {PersonType} from '../person/PersonType.model';
import {CreateEventOrganizerDTO} from '../eventOrganizer/CreateEventOrganizerDTO.model';
import {CreateRegistrationRequestDTO} from '../registrationRequest/CreateRegistrationRequestDTO.model';

export interface CreateEventOrganizerAccountDTO{
  email: string;
  password: string;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: CreateEventOrganizerDTO;
  registrationRequest: CreateRegistrationRequestDTO;
}
