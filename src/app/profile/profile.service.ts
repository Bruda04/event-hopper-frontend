import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {ChangePasswordDTO} from '../shared/dto/users/account/ChangePasswordDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) {}

  //not implemented
  /**getProfileDetailsForServiceProvider(): Observable<any> {
    return this.httpClient.get(environment.apiHost + '/login');
  }**/

  getProfileDetailsForPerson( id: string): Observable<any> {
    return this.httpClient.get(environment.apiHost + "/accounts/" + id + '/profile');
  }

  changePassword( id: string, changePasswordDTO: ChangePasswordDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + "/accounts/" + id + '/change-password', changePasswordDTO);
  }

  deactivateAccount(id: string): Observable<any> {
    return this.httpClient.post(environment.apiHost + "/accounts/" + id + '/deactivate', {});
  }

}
