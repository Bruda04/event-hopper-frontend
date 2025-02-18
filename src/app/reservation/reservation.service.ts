import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {HttpClient} from '@angular/common/http';
import {CreateReservationProductDTO} from '../shared/dto/reservations/CreateReservationProductDTO.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private HttpClient: HttpClient) { }

  buyProduct(reservation: CreateReservationProductDTO): Observable<any> {
    return this.HttpClient.post(environment.apiHost + '/reservations/products', reservation);
  }
}
