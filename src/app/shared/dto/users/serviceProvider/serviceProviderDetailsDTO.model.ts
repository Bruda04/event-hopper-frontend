import {SimpleCommentDTO} from '../../comments/simpleCommentDTO.model';
import {LocationDTO} from '../../locations/LocationDTO.model';
import {PersonType} from '../../../model/PersonType.model';

export interface ServiceProviderDetailsDTO {
  id: string;
  name: string;
  surname: string;
  profilePicture: string;
  phoneNumber: string;
  type: PersonType;

  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDescription: string;
  companyPhotos: string[];
  workStart: string; // LocalTime can be represented as a string in ISO format
  workEnd: string; // LocalTime can be represented as a string in ISO format
  companyLocation: LocationDTO;

  comments: SimpleCommentDTO[];
  rating: number;
}
