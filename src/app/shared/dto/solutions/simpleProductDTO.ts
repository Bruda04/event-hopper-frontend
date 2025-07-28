import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';

export interface SimpleProductDTO {
  id: string
  name: string
  description: string;
  category: SimpleCategoryDTO;
}
