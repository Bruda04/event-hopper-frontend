import {UpdatePersonDTO} from '../person/UpdatePersonDTO.model';
import {LocationDTO} from '../../locations/LocationDTO.model';


export interface UpdateServiceProviderDTO extends UpdatePersonDTO{
  companyDescription: string;
  companyPhotos: string[];
  workStart: string;
  workEnd: string;
  companyLocation: LocationDTO;
}
