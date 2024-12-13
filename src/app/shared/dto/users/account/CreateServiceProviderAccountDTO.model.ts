import {CreateServiceProviderDTO} from '../serviceProvider/CreateServiceProviderDTO.model';
import {PersonType} from '../../../model/PersonType.model';
import {CreateRegistrationRequestDTO} from '../../registrationRequest/CreateRegistrationRequestDTO.model';

export interface CreateServiceProviderAccountDTO{
  email: string;
  password: string;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: CreateServiceProviderDTO;
  registrationRequest: CreateRegistrationRequestDTO;
}
