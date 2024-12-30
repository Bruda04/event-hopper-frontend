import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';

export interface CreateEventTypeDTO{
  name: string;
  description: string;
  suggestedCategories: SimpleCategoryDTO[];
}
