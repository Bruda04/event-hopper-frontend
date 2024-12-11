import {PersonType} from '../person/PersonType.model';
import {SimplePersonDTO} from '../person/SimplePersonDTO.model';
import {RegistrationRequestDTO} from '../registrationRequest/RegistrationRequestDTO.model';

export interface CreatedAccountDTO{
  id:string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: SimplePersonDTO;
  registrationRequest: RegistrationRequestDTO;
}
