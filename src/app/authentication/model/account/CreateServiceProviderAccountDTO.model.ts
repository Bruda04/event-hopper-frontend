import {PersonType} from '../person/PersonType.model';
import {CreateRegistrationRequestDTO} from '../registrationRequest/CreateRegistrationRequestDTO.model';
import {CreateServiceProviderDTO} from '../serviceProvider/CreateServiceProviderDTO.model';

export interface CreateServiceProviderAccountDTO{
  email: string;
  password: string;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: CreateServiceProviderDTO;
  registrationRequest: CreateRegistrationRequestDTO;
}
