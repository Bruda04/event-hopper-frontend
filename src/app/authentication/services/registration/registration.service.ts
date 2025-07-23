import { Injectable } from '@angular/core';
import {environment} from '../../../../env/envirements';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateServiceProviderAccountDTO} from '../../../shared/dto/users/account/CreateServiceProviderAccountDTO.model';
import {CreateEventOrganizerAccountDTO} from '../../../shared/dto/users/account/CreateEventOrganizerAccountDTO.model';
import {
  CreateAuthenticatedUserAccountDTO
} from '../../../shared/dto/users/account/CreateAuthenticatedUserAccountDTO.model';
import {CreatedServiceProviderAccountDTO} from '../../../shared/dto/users/account/CreatedServiceProviderAccountDTO';
import {CreatedEventOrganizerDTO} from '../../../shared/dto/users/eventOrganizer/CreatedEventOrganizerDTO.model';
import {CreatedEventOrganizerAccountDTO} from '../../../shared/dto/users/account/CreatedEventOrganizerAccountDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {  }

  isEmailTaken(email: String): Observable<boolean> {
    return this.httpClient.post<boolean>(environment.apiHost + '/accounts/check-email', email);
  }

  registerServiceProvider(createDTO: CreateServiceProviderAccountDTO): Observable<CreatedServiceProviderAccountDTO> {
    return this.httpClient.post<CreatedServiceProviderAccountDTO>(environment.apiHost + '/accounts/service-provider', createDTO);
  }

  registerEventOrganizer(createDTO: CreateEventOrganizerAccountDTO): Observable<CreatedEventOrganizerAccountDTO> {
    return this.httpClient.post<CreatedEventOrganizerAccountDTO>(environment.apiHost + '/accounts/event-organizer', createDTO);
  }

  registerAuthenticatedUser(createDTO: CreateAuthenticatedUserAccountDTO):Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/person', createDTO);
  }
}
