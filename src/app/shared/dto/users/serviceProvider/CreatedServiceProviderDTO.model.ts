import {CreatedPersonDTO} from '../person/CreatedPersonDTO.model';
import {LocationDTO} from '../../locations/LocationDTO.model';

export interface CreatedServiceProviderDTO extends CreatedPersonDTO{
  companyName: string;
  companyEmail: string;
  companyDescription: string;
  companyPhotos: string[];
  workStart: string;
  companyLocation: LocationDTO
}
