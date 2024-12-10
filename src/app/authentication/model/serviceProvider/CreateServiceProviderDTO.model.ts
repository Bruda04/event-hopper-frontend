import {CreatePersonDTO} from '../person/CreatePersonDTO.model';
import {CreateLocationDTO} from '../location/CreateLocationDTO.model';

export interface CreateServiceProviderDTO extends CreatePersonDTO{
  companyName: string;
  companyEmail: string;
  companyDescription: string;
  companyPhotos: string[];
  workStart: string;
  companyLocation: CreateLocationDTO
}
