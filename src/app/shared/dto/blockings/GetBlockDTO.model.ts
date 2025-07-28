import {SimpleAccountDTO} from '../users/account/SimpleAccountDTO.model';

export interface GetBlockDTO {
  id: string;
  timestamp: Date;
  who: SimpleAccountDTO;
  blocked: SimpleAccountDTO;
}
