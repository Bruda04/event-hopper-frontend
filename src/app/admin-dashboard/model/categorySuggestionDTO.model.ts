import {SimpleCategoryDTO} from './simpleCategoryDTO.model';

export interface SimpleProductDTO {
  id: string;
  name: string;
  description: string;
  category: SimpleCategoryDTO;
}

export interface CategorySuggestionDTO {
  id?: string;
  name: string;
  status?: string;
  product: SimpleProductDTO;
}
