import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../env/envirements';
import {Observable} from 'rxjs';
import {SimpleCommentDTO} from '../../shared/dto/comments/simpleCommentDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  getPendingComments(): Observable<SimpleCommentDTO[]> {
    return this.httpClient.get<SimpleCommentDTO[]>(environment.apiHost + "/comments/pending");
  }

  approve(id: string): Observable<any> {
    return this.httpClient.put(environment.apiHost + "/comments/pending" + id+ "/approved", {})
  }

  delete(id: string): Observable<any> {
    return this.httpClient.put(environment.apiHost + "/comments/pending" + id+ "/delete", {})
  }

}
