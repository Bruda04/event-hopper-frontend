import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';

export  interface ProductDTO {
  id: string,
  name: string,
  description: string,
  pictures: string[],
  category: SimpleCategoryDTO
}
