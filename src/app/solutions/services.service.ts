import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/envirements';
import {Observable} from 'rxjs';
import {PagedResponse} from '../shared/model/paged-response.model';
import {ServiceManagementDTO} from '../shared/dto/solutions/serviceManagementDTO.model';
import {CreateServiceDTO} from '../shared/dto/solutions/createServiceDTO.model';
import {UpdateServiceDTO} from '../shared/dto/solutions/updateServiceDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient: HttpClient) {  }

  getAllForManagement(pageProperties: any,
                      categoryId: string,
                      eventTypeIds: string[],
                      minPrice: number,
                      maxPrice: number,
                      available: boolean,
                      textSearch: string,
                      sortField: string,
                      sortDirection: string
                      ): Observable<PagedResponse<ServiceManagementDTO>> {
    let params :HttpParams = new HttpParams();
    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize)
    }

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
    if (textSearch) {
      params = params.set('searchContent', textSearch);
    }
    if (sortField) {
      params = params.set('sortField', sortField);
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }


    return this.httpClient.get<PagedResponse<ServiceManagementDTO>>(environment.apiHost + `/services/management`, {params: params});
  }


  add(service: CreateServiceDTO): Observable<unknown> {
    return this.httpClient.post(environment.apiHost + '/services', service);
  }

  remove(id: string): Observable<unknown> {
    return this.httpClient.delete(environment.apiHost + '/services/' + id);
  }

  update(id: string, service: UpdateServiceDTO): Observable<unknown> {
   return this.httpClient.put(environment.apiHost + '/services/' + id, service);
  }
}
