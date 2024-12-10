import { Injectable } from '@angular/core';
import {environment} from '../../../../env/envirements';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateAccountDTO} from '../../model/account/CreateAccountDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {  }

  registerServiceProvider(createDTO: CreateAccountDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts', createDTO);
  }

  registerEventOrganizer(createDTO: CreateAccountDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts', createDTO);
  }

  registerPerson(createDTO: CreateAccountDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts', createDTO);
  }

}
