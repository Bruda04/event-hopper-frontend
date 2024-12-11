import { Injectable } from '@angular/core';
import {CategoryDTO} from '../model/categoryDTO.model';
import {CategorySuggestionDTO} from '../model/categorySuggestionDTO.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../env/envirements';
import {CreateCategoryDTO} from '../model/createCategoryDTO.model';
import {UpdateCategoryDTO} from '../model/UpdateCategoryDTO.model';
import {UpdateCategorySuggestionDTO} from '../model/updateCategorySuggestionDTO.model';
import {SimpleCategoryDTO} from '../model/simpleCategoryDTO.model';
import {CreatedCategorySuggestionDTO} from '../model/createdCategorySuggestionDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

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

  approve(id: string, suggestion: UpdateCategorySuggestionDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + '/categories/suggestions/' + id, suggestion);
  }

  reject(categoryId: string, suggestion: UpdateCategorySuggestionDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + '/categories/suggestions/' + categoryId, suggestion);
  }

  makeSuggestion(categoryName: string): Observable<CreatedCategorySuggestionDTO> {
    return this.httpClient.post<CreatedCategorySuggestionDTO>(environment.apiHost + '/categories/suggestions', {name: categoryName});
  }
}
