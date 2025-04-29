import {SimpleAccountDTO} from '../users/account/SimpleAccountDTO.model';

export interface GetReportDTO{
  id: string;
  reason: string;
  timestamp: Date;
  reporter: SimpleAccountDTO;
  reported: SimpleAccountDTO;
}
