import {PersonType} from '../../../model/PersonType.model';
import {CreateRegistrationRequestDTO} from '../../registrationRequest/CreateRegistrationRequestDTO.model';
import {CreateAuthenticatedUserDTO} from '../authenticatedUser/CreateAuthenticatedUserDTO.model';

export interface CreateAuthenticatedUserAccountDTO {
  email: string;
  password: string;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: CreateAuthenticatedUserDTO;
  registrationRequest: CreateRegistrationRequestDTO;
}
