import {PersonType} from '../../../model/PersonType.model';
import {SimpleLocationDTO} from '../../locations/SimpleLocationDTO.model';


export interface UpdatePersonDTO {
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  type: PersonType;
  location: SimpleLocationDTO;
}
