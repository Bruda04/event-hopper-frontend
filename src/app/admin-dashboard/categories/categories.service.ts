import { Injectable } from '@angular/core';
import {CategoryDTO} from '../model/categoryDTO.model';
import {CategorySuggestionDTO} from '../model/categorySuggestionDTO.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../env/envirements';
import {CreateCategoryDTO} from '../model/createCategoryDTO.model';
import {UpdateCategoryDTO} from '../model/UpdateCategoryDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesList :CategoryDTO[] = []

  constructor(private httpClient: HttpClient) {  }

  getApproved(): Observable<CategoryDTO[]> {
    return this.httpClient.get<CategoryDTO[]>(environment.apiHost + '/categories');
  }

  getSuggestions(): Observable<CategorySuggestionDTO[]> {
    return this.httpClient.get<CategorySuggestionDTO[]>(environment.apiHost + '/categories/suggestions');
  }

  add(category: CreateCategoryDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/categories', category);
  }

  remove(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/categories/' + id);
  }

  update(id: string,category: UpdateCategoryDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + '/categories/' + id, category);
  }

  approve(suggestion: CategorySuggestionDTO) {
    const index: number = this.categoriesList.findIndex((c: CategoryDTO) => c.id === suggestion.id);
    this.categoriesList[index].status = "APPROVED";
  }

  reject(suggestion: CategorySuggestionDTO) {
    const index: number = this.categoriesList.findIndex((c: CategoryDTO) => c.id === suggestion.id);
    this.categoriesList.splice(index, 1);
  }
}
