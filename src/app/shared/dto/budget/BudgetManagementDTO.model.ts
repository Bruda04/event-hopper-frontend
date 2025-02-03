import {BudgetItemManagementDTO} from './BudgetItemManagementDTO.model';
import {SimpleEventDTO} from '../events/simpleEventDTO.model';

export interface BudgetManagementDTO {
  totalAmount: number;
  budgetItems: BudgetItemManagementDTO[];
  event: SimpleEventDTO;
}
