import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {ChangePasswordDTO} from '../shared/dto/users/account/ChangePasswordDTO.model';
import {UpdatePersonDTO} from '../shared/dto/users/person/UpdatePersonDTO.model';
import {UpdateCompanyAccountDTO} from '../shared/dto/users/account/UpdateCompanyAccountDTO.model';
import {DetailedServiceProviderDTO} from '../shared/dto/users/serviceProvider/DetailedServiceProviderDTO.model';
import { ServiceProviderDetailsDTO } from '../shared/dto/users/serviceProvider/serviceProviderDetailsDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) {}

  getProfileDetailsForPerson( id: string): Observable<any> {
    return this.httpClient.get(environment.apiHost + "/accounts/" + id + '/profile');
  }

  getProfileByEmail(email: string): Observable<any> {
    return this.httpClient.get(environment.apiHost + "/accounts/active/" + email);
  }

  changePassword( id: string, changePasswordDTO: ChangePasswordDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + "/accounts/" + id + '/change-password', changePasswordDTO);
  }

  deactivateAccount(id: string): Observable<any> {
    return this.httpClient.post(environment.apiHost + "/accounts/" + id + '/deactivate', {});
  }

  editProfileInformation(id: string, updatePersonDTO: UpdatePersonDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts/" + id, updatePersonDTO);
  }

  editCompanyInformation(id: string, updateCompanyAccount: UpdateCompanyAccountDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts/" + id + "/company", updateCompanyAccount);
  }

  editPerson(id: string, updatePersonDTO: UpdatePersonDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + "/persons/" + id , updatePersonDTO);
  }

  getPerson(id: string): Observable<any> {
    return this.httpClient.get(environment.apiHost + "/persons/" + id );
  }

  addAttending(personId: string, eventId: string): Observable<any> {
    return this.httpClient.get(environment.apiHost + "/persons/" + personId + '/attending-events/'  + eventId);
  }

  upgradeToOD(personId:string) : Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts/upgrade-to-OD/" + personId,{} );
  }

  upgradeToPUP(personId:string, details: DetailedServiceProviderDTO ) : Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts/upgrade-to-PUP/" + personId,details );
  }

  getServiceProviderDetails(id: string): Observable<ServiceProviderDetailsDTO> {
    return this.httpClient.get<ServiceProviderDetailsDTO>(environment.apiHost + '/service-providers/' + id + '/details');
  }

  addSolutionToFavorites(solutionId: string): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/persons/favorite-solutions/' + solutionId, {});
  }

  removeSolutionFromFavorites(solutionId: string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/persons/favorite-solutions/' + solutionId);
  }

}
