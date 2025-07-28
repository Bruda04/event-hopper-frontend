import {PersonType} from '../../../model/PersonType.model';
import {SimpleServiceProviderDTO} from '../serviceProvider/SimpleServiceProviderDTO.model';
import {RegistrationRequestDTO} from '../../registrationRequest/RegistrationRequestDTO.model';

export interface CreatedServiceProviderAccountDTO {
  id: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: SimpleServiceProviderDTO;
  registrationRequest: RegistrationRequestDTO;
}
