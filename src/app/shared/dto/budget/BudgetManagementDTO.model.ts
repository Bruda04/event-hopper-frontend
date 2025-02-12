import {BudgetItemManagementDTO} from './BudgetItemManagementDTO.model';
import {SimpleEventDTO} from '../events/simpleEventDTO.model';

export interface BudgetManagementDTO {
  leftAmount: number;
  budgetItems: BudgetItemManagementDTO[];
  event: SimpleEventDTO;
}
