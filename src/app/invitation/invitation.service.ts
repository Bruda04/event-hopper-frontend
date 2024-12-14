import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {InvitationDTO} from '../shared/dto/invitations/InvitationDTO.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {CreateInvitationDTO} from '../shared/dto/invitations/CreateInvitationDTO.model';
import {UpdateInvitationDTO} from '../shared/dto/invitations/UpdateInvitationDTO.model';


@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private HttpClient: HttpClient) { }

  getInvitations(): Observable<InvitationDTO[]>{
    return this.HttpClient.get<InvitationDTO[]>(environment.apiHost + '/invitations');
  }

  getInvitation(id: String): Observable<InvitationDTO>{
    return this.HttpClient.get<InvitationDTO>(environment.apiHost + '/invitations/' + id);
  }

  create(invitation: CreateInvitationDTO): Observable<any> {
    return this.HttpClient.post(environment.apiHost + '/invitations', invitation);
  }

  attend(id:string, invitation: UpdateInvitationDTO ): Observable<any> {
    return this.HttpClient.put(environment.apiHost + '/invitations/' + id, invitation);
  }

  reject(id:string, invitation: UpdateInvitationDTO ): Observable<any> {
    return this.HttpClient.put(environment.apiHost + '/invitations/' + id, invitation);
  }



}
