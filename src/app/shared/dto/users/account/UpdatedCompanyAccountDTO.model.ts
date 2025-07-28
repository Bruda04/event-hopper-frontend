import {LocationDTO} from '../../locations/LocationDTO.model';
import {SimpleLocationDTO} from '../../locations/SimpleLocationDTO.model';

export interface UpdatedCompanyAccountDTO{
  companyDescription: string;
  companyPhoneNumber: string;
  companyLocation: SimpleLocationDTO;
}
