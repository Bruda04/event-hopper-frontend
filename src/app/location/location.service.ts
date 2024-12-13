import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {LocationDTO} from '../authentication/model/location/LocationDTO.model';
import {environment} from '../../env/envirements';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private HttpClient: HttpClient) {}

  getLocations(): Observable<LocationDTO[]> {
    return this.HttpClient.get<LocationDTO[]>(environment.apiHost + '/locations');
  }

  getLocation(id: string) : Observable<LocationDTO[]> {
    return this.HttpClient.get<LocationDTO[]>(environment.apiHost + '/locations/' + id);
  }
}
