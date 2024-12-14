import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/envirements';
import {PagedResponse} from '../shared/model/paged-response.model';
import {ProductDTO} from '../shared/dto/solutions/productDTO.model';
import {SolutionDetailsDTO} from '../shared/dto/solutions/solutionDetailsDTO.model';
import {ServiceProviderDetailsDTO} from '../shared/dto/users/serviceProvider/serviceProviderDetailsDTO.model';

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

  getSolutionDetails(id: string): Observable<SolutionDetailsDTO> {
    return this.HttpClient.get<SolutionDetailsDTO>(environment.apiHost + '/solutions/' + id + '/details');
  }

  getServiceProviderDetails(id: string): Observable<ServiceProviderDetailsDTO> {
    return this.HttpClient.get<ServiceProviderDetailsDTO>(environment.apiHost + '/service-providers/' + id + '/details');
  }

  getTop5Solutions(userId: string): Observable<ProductDTO[]> {
    return this.HttpClient.get<ProductDTO[]>(environment.apiHost + '/solutions/persons-top-5/' + userId);
  }

  getSolutionsPage(
    pageProperties: any,
    sortField: string,
    isProduct: boolean,
    isService: boolean,
    categoryId?: string,
    eventTypeIds?: string[],
    minPrice?: number,
    maxPrice?: number,
    available?: boolean,
    searchContent?: string,

  ): Observable<PagedResponse<ProductDTO>> {
    let params = new HttpParams()
    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize)
    }


    params = params.set('isProduct', isProduct);


    params = params.set('isService', isService);


    if(categoryId) {
      params = params.set('categoryId', categoryId);
    }
    if(eventTypeIds) {
      params = params.set('eventTypeIds', eventTypeIds.join(','));
    }
    if(minPrice) {
      params = params.set('minPrice', minPrice);
    }
    if(maxPrice) {
      params = params.set('maxPrice', maxPrice);
    }
    if(available !== null) {
      params = params.set('isAvailable', available);
    }
    if (searchContent) {
      params = params.set('searchContent', searchContent);
    }
    if (sortField) {
      params = params.set('sortField', sortField);
    }

    return this.HttpClient.get<PagedResponse<ProductDTO>>(environment.apiHost + '/solutions/search', { params });
  }
}
