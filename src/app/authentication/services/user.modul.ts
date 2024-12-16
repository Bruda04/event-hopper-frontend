import {SimpleEventDTO} from '../../shared/dto/events/simpleEventDTO';
import {SimpleProductDTO} from '../../shared/dto/solutions/simpleProductDTO';
import {SimpleLocationDTO} from '../../shared/dto/locations/SimpleLocationDTO.model';

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    profilePicture: string;
    phoneNumber: string;
    address: string;
    city: string;
    role: string;

    companyEmail: string;
    companyName: string;
    companyPhoneNumber: string;
    companyDescription: string;
    companyLocation: SimpleLocationDTO;
    myEvents: SimpleEventDTO[];
    favoriteEvents: SimpleEventDTO[];
    favoriteSolutions: SimpleProductDTO[]
    attendingEvents: SimpleEventDTO[];
  }
