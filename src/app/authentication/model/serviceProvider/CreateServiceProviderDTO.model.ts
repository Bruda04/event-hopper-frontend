import {CreatePersonDTO} from '../person/CreatePersonDTO.model';
import {CreateLocationDTO} from '../location/CreateLocationDTO.model';

export interface CreateServiceProviderDTO extends CreatePersonDTO{
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDescription: string;
  companyPhotos: string[];
  companyLocation: CreateLocationDTO
}
