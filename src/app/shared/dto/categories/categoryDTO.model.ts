import {SimpleEventTypeDTO} from '../eventTypes/SimpleEventTypeDTO.model';

export interface CategoryDTO {
  id: string;
  name: string;
  description: string;
  status: string;
  eventTypes: SimpleEventTypeDTO[];
  deletable: boolean;
}
