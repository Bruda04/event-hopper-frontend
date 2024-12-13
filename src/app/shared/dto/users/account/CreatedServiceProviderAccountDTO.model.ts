import {PersonType} from '../person/PersonType.model';
import {RegistrationRequestDTO} from '../registrationRequest/RegistrationRequestDTO.model';
import {SimpleServiceProviderDTO} from '../serviceProvider/SimpleServiceProviderDTO.model';


export interface CreatedServiceProviderAccountDTOModel{
  id: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: SimpleServiceProviderDTO;
  registrationRequest: RegistrationRequestDTO;
}
