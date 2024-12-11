import {PersonType} from './PersonType.model';
import {CreateLocationDTO} from '../location/CreateLocationDTO.model';

export interface CreatePersonDTO {
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  type: PersonType;
  location: CreateLocationDTO;
}
