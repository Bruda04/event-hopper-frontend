import {PersonType} from '../../../model/PersonType.model';
import {CreateLocationDTO} from '../../locations/CreateLocationDTO.model';

export interface CreatePersonDTO {
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  type: PersonType;
  location: CreateLocationDTO;
}
