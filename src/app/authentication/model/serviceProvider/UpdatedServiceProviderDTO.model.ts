import {UpdatedPersonDTO} from '../person/UpdatedPersonDTO.model';
import {LocationDTO} from '../location/LocationDTO.model';

export interface UpdatedServiceProviderDTO extends UpdatedPersonDTO{
  companyName: string;
  companyEmail: string;
  companyDescription: string;
  companyPhotos: string[];
  workStart: string;
  workEnd: string;
  companyLocation: LocationDTO;
}
