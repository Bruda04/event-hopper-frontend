import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';

export interface SimpleEventTypeDTO {
  id?: string;
  name: string;
  description: string;
  deactivated: boolean;
  suggestedCategories: SimpleCategoryDTO[];
}
