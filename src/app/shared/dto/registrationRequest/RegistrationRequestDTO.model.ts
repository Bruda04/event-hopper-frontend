import {RegistrationRequestStatus} from './RegistrationRequestStatus.model';

export interface RegistrationRequestDTO{
  id:string;
  timestamp: string;
  status: RegistrationRequestStatus;

}
