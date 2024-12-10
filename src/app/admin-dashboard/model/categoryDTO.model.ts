import {SimpleEventTypeDTO} from './simpleEventTypeDTO.model';

export interface CategoryDTO {
  id: string;
  name: string;
  description: string;
  status: string;
  eventTypes: SimpleEventTypeDTO[];
}
