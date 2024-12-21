import {LocationDTO} from '../../locations/LocationDTO.model';

export interface UpdatedCompanyAccountDTO{
  companyDescription: string;
  companyPhoneNumber: string;
  companyLocation: LocationDTO;
}
