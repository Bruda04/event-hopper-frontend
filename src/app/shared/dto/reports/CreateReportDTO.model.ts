import {SimpleAccountDTO} from '../users/account/SimpleAccountDTO.model';

export interface CreateReportDTO{
  reason:string;
  reporter: SimpleAccountDTO;
  reported: SimpleAccountDTO;
}
