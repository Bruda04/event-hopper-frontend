import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginDTO} from '../../model/account/LoginDTO.model';
import {environment} from '../../../../env/envirements';


@Injectable({
  providedIn: 'root' // This means the service is available globally in the app
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loginUser(loginDTO : LoginDTO): Observable<any> {
      return this.httpClient.post(environment.apiHost + '/login', loginDTO);
  }


}
