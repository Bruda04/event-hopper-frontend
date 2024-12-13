import {PersonType} from '../person/PersonType.model';
import {SimplePersonDTO} from '../person/SimplePersonDTO.model';

export interface SimpleAccountDTO{
  id: string;
  email: string;
  type: PersonType;
  person: SimplePersonDTO;
}
