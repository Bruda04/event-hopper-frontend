import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductDTO} from './model/productDTO.model';
import {environment} from '../../env/envirements';
import {PagedResponse} from '../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClient: HttpClient) { }

  getSolutions(): Observable<ProductDTO[]>{
    return this.HttpClient.get<ProductDTO[]>(environment.apiHost + '/solutions');
  }

  getSolution(id: string): Observable<ProductDTO> {
    return this.HttpClient.get<ProductDTO>(environment.apiHost + '/solutions/' + id);
  }

  getTop5Solutions(userId: string): Observable<ProductDTO[]> {
    return this.HttpClient.get<ProductDTO[]>(environment.apiHost + '/solutions/persons-top-5/' + userId);
  }

  getSolutionsPage(
    page: number,
    size: number,
    isProduct?: boolean,
    isService?: boolean,
    categoryId?: string,
    eventTypeIds?: string[],
    minPrice?: number,
    maxPrice?: number,
    searchContent?: string
  ): Observable<PagedResponse<ProductDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (isProduct !== undefined) params = params.set('isProduct', isProduct.toString());
    if (isService !== undefined) params = params.set('isService', isService.toString());
    if (categoryId) params = params.set('categoryId', categoryId);
    if (eventTypeIds && eventTypeIds.length > 0) params = params.set('eventTypeIds', eventTypeIds.join(','));
    if (minPrice !== undefined) params = params.set('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params = params.set('maxPrice', maxPrice.toString());
    if (searchContent) params = params.set('searchContent', searchContent);

    return this.HttpClient.get<PagedResponse<ProductDTO>>(environment.apiHost + '/search/', { params });
  }
}
