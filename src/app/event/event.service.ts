import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/envirements';
import {Observable} from 'rxjs';
import {PagedResponse} from '../shared/model/paged-response.model';
import {EventDTO} from '../shared/dto/events/eventDTO.model';
import {SinglePageEventDTO} from '../shared/dto/events/SinglePageEventDTO.model';
import {CreateEventDTO} from '../shared/dto/events/CreateEventDTO.model';
import {GetEventAgendasDTO} from '../shared/dto/events/GetEventAgendasDTO.model';
import {SimpleAccountDTO} from '../shared/dto/users/account/SimpleAccountDTO.model';
import {GraphDataDTO} from '../shared/dto/events/GraphDataDTO';
import {CreatedEventDTO} from '../shared/dto/events/CreatedEventDTO.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private HttpClient: HttpClient) {}

  addEvent(createDTO: CreateEventDTO) : Observable<CreatedEventDTO> {
    return this.HttpClient.post<CreatedEventDTO>(environment.apiHost + '/events', createDTO);
  }

  getEvents(): Observable<EventDTO[]> {
    return this.HttpClient.get<EventDTO[]>(environment.apiHost + '/events');
  }

  getEventStats(id: string): Observable<GraphDataDTO> {
    return this.HttpClient.get<GraphDataDTO>(environment.apiHost + '/events/' + id + "/graph");
  }

  getEvent(id: string) : Observable<SinglePageEventDTO> {
    return this.HttpClient.get<SinglePageEventDTO>(environment.apiHost + '/events/' + id)
  }

  getGuestList(id: string) : Observable<SimpleAccountDTO[]> {
    return this.HttpClient.get<SimpleAccountDTO[]>(environment.apiHost + '/events/guest-list/' + id)
  }

  getTop5Events(): Observable<EventDTO[]> {
    return this.HttpClient.get<EventDTO[]>(environment.apiHost + '/events/persons-top-5' );
  }

  getOrganizerEvents() : Observable<EventDTO[]> {
    return this.HttpClient.get<EventDTO[]>(environment.apiHost + '/events/organizer');
  }

  getAgendaForEvent(id: string) : Observable<GetEventAgendasDTO> {
    return this.HttpClient.get<GetEventAgendasDTO>(environment.apiHost + '/events/'+ id + '/agenda');
  }


  getEventsPage(
    pageProperties: any,
    sortField: string,
    city?: string,
    eventTypeId?: string,
    time?: string,
    searchContent?: string

  ):Observable<PagedResponse<EventDTO>>{
    let params = new HttpParams()
    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize)
    }

    if (time) console.log(time)
    params = params.set('sortField', sortField);

    if (city) {
      params = params.set('city', city);
    }
    if (eventTypeId) {
      params = params.set('eventTypeId', eventTypeId);
    }
    if (time) {
      params = params.set('time', time);
    }

    if (searchContent) {
      params = params.set('searchContent', searchContent);
    }
    return this.HttpClient.get<PagedResponse<EventDTO>>(environment.apiHost +  '/events/search', { params });
  }



}
