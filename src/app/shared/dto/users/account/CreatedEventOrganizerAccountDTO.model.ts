import {PersonType} from '../../../model/PersonType.model';
import {SimpleEventOrganizerDTO} from '../eventOrganizer/SimpleEventOrganizerDTO.model';
import {RegistrationRequestDTO} from '../../registrationRequest/RegistrationRequestDTO.model';

export interface CreatedEventOrganizerAccountDTO{
  id: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: SimpleEventOrganizerDTO;
  registrationRequest: RegistrationRequestDTO;
}
