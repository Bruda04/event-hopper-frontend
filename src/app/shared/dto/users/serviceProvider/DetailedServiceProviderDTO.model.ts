import {LocationDTO} from '../../locations/LocationDTO.model';
import {CreateLocationDTO} from '../../locations/CreateLocationDTO.model';

export interface DetailedServiceProviderDTO{
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDescription: string;
  companyPhotos: string[];
  companyLocation: CreateLocationDTO
}
