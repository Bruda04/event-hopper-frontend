import {PersonType} from '../../../model/PersonType.model';

export interface UpdateAccountDTO{
  isVerified: boolean;
  isActive: boolean;
  suspensionTimeStamp: string;
  type: PersonType;
}
