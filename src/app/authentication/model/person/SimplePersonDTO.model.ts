import {PersonType} from './PersonType.model';
import {SimpleLocationDTO} from '../location/SimpleLocationDTO.model'

export interface SimplePersonDTO {
  id: string;
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  type: PersonType;
  location: SimpleLocationDTO;
}
