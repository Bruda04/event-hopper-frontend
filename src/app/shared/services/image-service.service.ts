import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../env/envirements';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient: HttpClient) { }

  uploadImage(imageData: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', imageData);

    return this.httpClient.post<string>(environment.apiHost + "/images", formData, { responseType: 'text' as 'json' });
  }
}
