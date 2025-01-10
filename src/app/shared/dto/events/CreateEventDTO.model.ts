import {EventPrivacyType} from '../../model/EventPrivacyType.model';
import {CreateAgendaActivityDTO} from './CreateAgendaActivityDTO.model.';
import {CreateLocationDTO} from '../locations/CreateLocationDTO.model';

export interface CreateEventDTO{
  name: string;
  maxAttendance: number;
  description: string;
  eventPrivacyType: EventPrivacyType;
  time: string;
  picture: string;
  eventTypeId: string;
  agendaActivities: CreateAgendaActivityDTO[];
  location: CreateLocationDTO;
}
