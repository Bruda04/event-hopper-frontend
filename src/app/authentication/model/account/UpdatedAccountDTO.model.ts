import {PersonType} from '../person/PersonType.model';
import {SimplePersonDTO} from '../person/SimplePersonDTO.model';
import {RegistrationRequestDTO} from '../registrationRequest/RegistrationRequestDTO.model';

export interface UpdatedAccountDTO{
  id: string;
  email: string;
  suspensionTimeStamp: string;
  type: PersonType;
  person: SimplePersonDTO;
  registrationRequestId: RegistrationRequestDTO;
}
