import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetReportDTO} from '../../shared/dto/reports/GetReportDTO.model';
import {environment} from '../../../env/envirements';
import {CreateReportDTO} from '../../shared/dto/reports/CreateReportDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  getReports(): Observable<GetReportDTO[]> {
    return this.httpClient.get<GetReportDTO[]>(environment.apiHost + '/reports');
  }

  create(report: CreateReportDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/reports', report);
  }

  suspend(id:string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/reports/suspend/' + id);
  }

  delete(id:string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/reports/delete/' + id);
  }

}
