import {SimpleLocationDTO} from '../../locations/SimpleLocationDTO.model';
import {PersonType} from '../../../model/PersonType.model';


export interface SimplePersonDTO {
  id: string;
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  type: PersonType;
  location: SimpleLocationDTO;
}
