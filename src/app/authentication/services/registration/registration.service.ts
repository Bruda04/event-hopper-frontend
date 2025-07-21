import { Injectable } from '@angular/core';
import {environment} from '../../../../env/envirements';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateServiceProviderAccountDTO} from '../../../shared/dto/users/account/CreateServiceProviderAccountDTO.model';
import {CreateEventOrganizerAccountDTO} from '../../../shared/dto/users/account/CreateEventOrganizerAccountDTO.model';
import {
  CreateAuthenticatedUserAccountDTO
} from '../../../shared/dto/users/account/CreateAuthenticatedUserAccountDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {  }

  isEmailTaken(email: String): Observable<boolean> {
    return this.httpClient.post<boolean>(environment.apiHost + '/accounts/check-email', email);
  }

  registerServiceProvider(createDTO: CreateServiceProviderAccountDTO): Observable<unknown> {
    return this.httpClient.post(environment.apiHost + '/accounts/service-provider', createDTO);
  }

  registerEventOrganizer(createDTO: CreateEventOrganizerAccountDTO): Observable<unknown> {
    return this.httpClient.post(environment.apiHost + '/accounts/event-organizer', createDTO);
  }

  registerAuthenticatedUser(createDTO: CreateAuthenticatedUserAccountDTO):Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/person', createDTO);
  }
}
