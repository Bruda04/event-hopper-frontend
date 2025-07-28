import {SimplePersonDTO} from '../person/SimplePersonDTO.model';
import {LocationDTO} from '../../locations/LocationDTO.model';

export interface SimpleServiceProviderDTO extends  SimplePersonDTO{
  companyName: string;
  companyEmail: string;
  companyDescription: string;
  companyPhotos: string[];
  workStart: string;
  workEnd: string;
  companyLocation: LocationDTO;
}
