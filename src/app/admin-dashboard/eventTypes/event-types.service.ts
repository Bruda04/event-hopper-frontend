import { Injectable } from '@angular/core';
import {EventType} from '../../shared/model/eventType.model';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../env/envirements';
import {EventTypeManagementDTO} from '../../shared/dto/eventTypes/EventTypeManagementDTO.model';
import {UpdateCategoryDTO} from '../../shared/dto/categories/UpdateCategoryDTO.model';
import {UpdateEventTypeDTO} from '../../shared/dto/eventTypes/UpdateEventTypeDTO.model';
import {CreateCategoryDTO} from '../../shared/dto/categories/createCategoryDTO.model';
import {CreateEventTypeComponent} from './create-event-type/create-event-type.component';
import {CreateEventTypeDTO} from '../../shared/dto/eventTypes/CreateEventTypeDTO.model';

@Injectable({
  providedIn: 'root'
})
export class EventTypesService {

  constructor(private httpClient: HttpClient) {  }

  getEventTypesForManagement(): Observable<EventTypeManagementDTO> {
    return this.httpClient.get<EventTypeManagementDTO>(environment.apiHost + '/event-types');
  }

  update(id: string, updateDTO: UpdateEventTypeDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + '/event-types/' + id, updateDTO);
  }

  add(createEventTypeDTO: CreateEventTypeDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/event-types', createEventTypeDTO);
  }

  remove(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/event-types/' + id);
  }
}
