import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {NotificationDTO} from '../shared/dto/notifications/notificationDTO.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private HttpClient: HttpClient) { }


}
