import {SimpleLocationDTO} from '../location/SimpleLocationDTO.model';

export interface UpdatedPersonDTO {
  id: string;
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  location: SimpleLocationDTO;
}
