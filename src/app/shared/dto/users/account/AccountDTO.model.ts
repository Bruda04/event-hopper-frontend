import {SimplePersonDTO} from '../person/SimplePersonDTO.model';
import {PersonType} from '../../../model/PersonType.model';

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
