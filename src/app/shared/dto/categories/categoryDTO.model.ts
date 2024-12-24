import {SimpleEventTypeDTO} from '../eventTypes/simpleEventTypeDTO.model';

export interface CategoryDTO {
  id: string;
  name: string;
  description: string;
  status: string;
  eventTypes: SimpleEventTypeDTO[];
  deletable: boolean;
}
