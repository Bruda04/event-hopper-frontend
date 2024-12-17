import {LocationDTO} from '../../locations/LocationDTO.model';

export interface UpdateCompanyAccountDTO{
  id: string;
  companyDescription: string;
  companyPhoneNumber: string;
  companyLocation: LocationDTO;
}
