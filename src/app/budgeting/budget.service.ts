import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateProductRatingDTO} from '../shared/dto/ratings/CreateProductRatingDTO.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {BudgetManagementDTO} from '../shared/dto/budget/BudgetManagementDTO.model';
import {UpdateBudgetItemDTO} from '../shared/dto/budget/UpdateBudgetItemDTO.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private httpClient: HttpClient) {}

  getManagement(eventId: string): Observable<BudgetManagementDTO> {
    return this.httpClient.get<BudgetManagementDTO>(environment.apiHost + "/budgets/" + eventId + "/management");
  }

  updateBudget(eventId: string, budget: UpdateBudgetItemDTO[]): Observable<BudgetManagementDTO> {
    return this.httpClient.put<BudgetManagementDTO>(environment.apiHost + "/budgets/" + eventId, budget);
  }
}
