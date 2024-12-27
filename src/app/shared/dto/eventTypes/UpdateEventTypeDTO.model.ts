import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';

export interface UpdateEventTypeDTO {
  description: string;
  suggestedCategories: SimpleCategoryDTO[];
}
