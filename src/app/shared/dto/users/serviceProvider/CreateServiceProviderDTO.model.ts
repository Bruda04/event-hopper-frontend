import {CreatePersonDTO} from '../person/CreatePersonDTO.model';
import {CreateLocationDTO} from '../../locations/CreateLocationDTO.model';

export interface CreateServiceProviderDTO extends CreatePersonDTO{
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDescription: string;
  companyPhotos: string[];
  companyLocation: CreateLocationDTO;
  workStart: string;
  workEnd: string;
}
