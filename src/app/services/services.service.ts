import { Injectable } from '@angular/core';
import {Service} from './model/service.model';
import {ServiceManagementDTO} from './model/serviceManagementDTO.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/envirements';
import {Observable} from 'rxjs';
import {PagedResponse} from '../shared/model/paged-response.model';
import {CreateServiceDTO} from './model/createServiceDTO.model';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private servicesList :Service[] = []

  constructor(private httpClient: HttpClient) {  }

  getAll(): Service[] {
    return null;
  }

  getAllForManagement(pageProperties: any): Observable<PagedResponse<ServiceManagementDTO>> {
    let params :HttpParams = new HttpParams();
    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<ServiceManagementDTO>>(environment.apiHost + `/services/management`, {params: params});
  }


  add(service: CreateServiceDTO): Observable<any> {
    console.log(service);
    return this.httpClient.post(environment.apiHost + '/services', service);
  }

  remove(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/services/' + id);
  }

  update(service: Service): void {
    const index: number = this.servicesList.findIndex((s: Service) => s.id === service.id);
    this.servicesList[index] = service;
  }
}
