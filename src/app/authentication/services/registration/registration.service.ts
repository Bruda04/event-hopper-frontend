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

  registerServiceProvider(createDTO: CreateServiceProviderAccountDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/service-provider', createDTO);
  }

  registerEventOrganizer(createDTO: CreateEventOrganizerAccountDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/event-organizer', createDTO);
  }


  registerAuthenticatedUser(createAccount: CreateAuthenticatedUserAccountDTO):Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/authenticated', createAccount);

  }
}
