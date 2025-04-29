import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {GetBlockDTO} from '../shared/dto/blockings/GetBlockDTO.model';
import {CreateBlockDTO} from '../shared/dto/blockings/CreateBlockDTO';

@Injectable({
  providedIn: 'root'
})
export class BlockingService {

  constructor(private httpClient: HttpClient) { }

  getBlocks(): Observable<GetBlockDTO[]> {
    return this.httpClient.get<GetBlockDTO[]>(environment.apiHost + '/blocking');
  }

  create(block: CreateBlockDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/blocking', block);
  }

  delete(id:string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/blocking/' + id);
  }
}
