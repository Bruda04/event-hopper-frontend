import {PersonType} from '../person/PersonType.model';
import {SimplePersonDTO} from '../person/SimplePersonDTO.model';

export interface AccountDTO{
  id:string;
  email: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
  person: SimplePersonDTO;
}
