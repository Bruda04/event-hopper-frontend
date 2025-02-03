import {SimpleCategoryDTO} from '../categories/simpleCategoryDTO.model';
import {SimpleProductDTO} from '../solutions/simpleProductDTO';

export interface BudgetItemManagementDTO {
  id: string;
  category: SimpleCategoryDTO;
  amount: number;
  deletable: boolean;
  purchasedProducts: SimpleProductDTO[];
}
