import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/envirements';
import {VerificationTokenState} from '../../../shared/model/VerificationTokenState.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private httpClient: HttpClient) { }

  verifyToken(token: string): Observable<VerificationTokenState> {
    return this.httpClient.get<VerificationTokenState>(environment.apiHost + '/accounts/verify/' + token);
  }

  resendVerificationEmail(token: string) {
    return this.httpClient.get(environment.apiHost + '/accounts/resend-verification-email/' + token);
  }

}
