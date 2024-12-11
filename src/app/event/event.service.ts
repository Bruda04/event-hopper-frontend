import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/envirements';
import {Observable} from 'rxjs';
import {PagedResponse} from '../shared/model/paged-response.model';
import {EventDTO} from './model/eventDTO.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private HttpClient: HttpClient) {}

  getEvents(): Observable<EventDTO[]> {
    return this.HttpClient.get<EventDTO[]>(environment.apiHost + '/events');
  }

  getEvent(id: string) : Observable<EventDTO> {
    return this.HttpClient.get<EventDTO>(environment.apiHost + '/events/' + id)
  }

  getTop5Events(usersId : string): Observable<EventDTO[]> {
    return this.HttpClient.get<EventDTO[]>(environment.apiHost + '/events/persons-top-5/' + usersId );
  }

  getEventsPage(page: number, size: number, city?: string, eventTypeId?: string, time?: string, searchContent?: string):Observable<PagedResponse<EventDTO>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (city) params = params.set('city', city);
    if (eventTypeId) params = params.set('eventTypeId', eventTypeId);
    if (time) params = params.set('time', time);
    if (searchContent) params = params.set('searchContent', searchContent);

    return this.HttpClient.get<PagedResponse<EventDTO>>(environment.apiHost +  '/search', { params });

  }


}
