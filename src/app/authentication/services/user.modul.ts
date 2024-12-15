import {SimpleEventDTO} from '../../shared/dto/events/simpleEventDTO';

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
    favoriteEvents: SimpleEventDTO[];
    attendingEvents: SimpleEventDTO[];
  }
