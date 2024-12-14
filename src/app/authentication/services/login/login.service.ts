import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/envirements';
import {LoginDTO} from '../../../shared/dto/users/account/LoginDTO.model';


@Injectable({
  providedIn: 'root' // This means the service is available globally in the app
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loginUser(loginDTO : LoginDTO): Observable<any> {
      return this.httpClient.post(environment.apiHost + '/login', loginDTO);
  }


}
