import {RatingTimeSeriesDTO} from './RatingTimeSeriesDTO';

export interface GraphDataDTO {
  ratings : RatingTimeSeriesDTO[] ;
  maxAttendance: number;
  numPendingInvitations: number;
  numDeclinesInvitations: number;
  numAcceptedInvitations: number;
}
