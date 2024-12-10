import {SimpleCategoryDTO} from '../../admin-dashboard/model/simpleCategoryDTO.model';

export  interface ProductDTO {
  id: string,
  name: string,
  description: string,
  pictures: string[],
  category: SimpleCategoryDTO
}
