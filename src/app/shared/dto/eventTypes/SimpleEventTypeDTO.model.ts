import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';

export interface SimpleEventTypeDTO {
  id?: string;
  name: string;
  description: string;
  suggestedCategories: SimpleCategoryDTO[];
}
