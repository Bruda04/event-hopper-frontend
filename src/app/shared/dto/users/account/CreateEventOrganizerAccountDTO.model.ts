import {CreateEventOrganizerDTO} from '../eventOrganizer/CreateEventOrganizerDTO.model';
import {CreateRegistrationRequestDTO} from '../../registrationRequest/CreateRegistrationRequestDTO.model';
import {PersonType} from '../../../model/PersonType.model';

export interface CreateEventOrganizerAccountDTO{
  email: string;
  password: string;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: CreateEventOrganizerDTO;
  registrationRequest: CreateRegistrationRequestDTO;
}
