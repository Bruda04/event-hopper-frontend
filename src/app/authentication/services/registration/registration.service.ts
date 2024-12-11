import { Injectable } from '@angular/core';
import {environment} from '../../../../env/envirements';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateServiceProviderAccountDTO} from '../../model/account/CreateServiceProviderAccountDTO.model';
import {CreateEventOrganizerAccountDTO} from '../../model/account/CreateEventOrganizerAccountDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {  }

  registerServiceProvider(createDTO: CreateServiceProviderAccountDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/service-provider', createDTO);
  }

  registerEventOrganizer(createDTO: CreateEventOrganizerAccountDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/event-organizer', createDTO);
  }


}
