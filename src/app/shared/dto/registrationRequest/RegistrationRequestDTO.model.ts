import {RegistrationRequestStatus} from '../../model/RegistrationRequestStatus.model';

export interface RegistrationRequestDTO{
  id:string;
  timestamp: string;
  status: RegistrationRequestStatus;

}
