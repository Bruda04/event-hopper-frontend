import {PersonType} from '../person/PersonType.model';
import {CreatePersonDTO} from '../person/CreatePersonDTO.model';
import {CreateRegistrationRequestDTO} from '../registrationRequest/CreateRegistrationRequestDTO.model';

export interface CreateAccountDTO{
  email: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: CreatePersonDTO;
  registrationRequest: CreateRegistrationRequestDTO;
}
