import {SimpleProductDTO} from '../dto/solutions/simpleProductDTO';
import {SimpleLocationDTO} from '../dto/locations/SimpleLocationDTO.model';
import {SimpleEventDTO} from '../dto/events/simpleEventDTO.model';

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
