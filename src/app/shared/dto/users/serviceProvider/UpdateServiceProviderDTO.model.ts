import {LocationDTO} from '../../locations/LocationDTO.model';

export interface UpdateServiceProviderDTO {
  companyDescription: string;
  companyPhoneNumber: string;
  companyLocation: LocationDTO;
}
