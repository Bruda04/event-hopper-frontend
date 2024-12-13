import {PersonType} from '../../../model/PersonType.model';

export interface UpdateAccountDTO{
  password: string;
  isVerified: boolean;
  isActive: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
}
