import {SimpleAccountDTO} from '../users/account/SimpleAccountDTO.model';

export interface CreateReportDTO{
  reason:string;
  reported: SimpleAccountDTO;
}
