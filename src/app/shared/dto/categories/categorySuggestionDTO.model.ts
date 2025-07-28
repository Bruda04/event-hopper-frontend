import {SimpleProductDTO} from '../solutions/simpleProductDTO';

export interface CategorySuggestionDTO {
  id?: string;
  name: string;
  status?: string;
  product: SimpleProductDTO;
}
