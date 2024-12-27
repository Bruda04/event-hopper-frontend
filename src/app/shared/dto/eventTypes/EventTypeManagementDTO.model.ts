import {SimpleEventTypeDTO} from './SimpleEventTypeDTO.model';
import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';

export interface EventTypeManagementDTO{
  eventTypes: SimpleEventTypeDTO[];
  allCategories: SimpleCategoryDTO[];
}
