import {SimpleLocationDTO} from '../location/SimpleLocationDTO.model';
import {PersonType} from './PersonType.model';

export interface UpdatePersonDTO {
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  type: PersonType;
  location: SimpleLocationDTO;
}
