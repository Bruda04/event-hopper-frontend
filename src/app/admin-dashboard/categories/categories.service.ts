import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../env/envirements';
import {CreateCategoryDTO} from '../../shared/dto/categories/createCategoryDTO.model';
import {UpdateCategoryDTO} from '../../shared/dto/categories/UpdateCategoryDTO.model';
import {CreatedCategorySuggestionDTO} from '../../shared/dto/categories/createdCategorySuggestionDTO.model';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {CategorySuggestionDTO} from '../../shared/dto/categories/categorySuggestionDTO.model';

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

  approve(id: string): Observable<any> {
    return this.httpClient.put(environment.apiHost + '/categories/suggestions/' + id + '/approve', {});
  }

  reject(categoryId: string, substituteCategoryId: string): Observable<any> {
    return this.httpClient.put(environment.apiHost + '/categories/suggestions/' + categoryId + '/reject/' + substituteCategoryId, {});
  }

  makeSuggestion(categoryName: string): Observable<CreatedCategorySuggestionDTO> {
    return this.httpClient.post<CreatedCategorySuggestionDTO>(environment.apiHost + '/categories/suggestions', {name: categoryName});
  }
}
