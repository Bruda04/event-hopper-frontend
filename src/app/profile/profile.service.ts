import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {ChangePasswordDTO} from '../shared/dto/users/account/ChangePasswordDTO.model';
import {UpdatePersonDTO} from '../shared/dto/users/person/UpdatePersonDTO.model';
import {UpdateCompanyAccountDTO} from '../shared/dto/users/account/UpdateCompanyAccountDTO.model';
import {DetailedServiceProviderDTO} from '../shared/dto/users/serviceProvider/DetailedServiceProviderDTO.model';
import { ServiceProviderDetailsDTO } from '../shared/dto/users/serviceProvider/serviceProviderDetailsDTO.model';
import {SimpleAccountDTO} from '../shared/dto/users/account/SimpleAccountDTO.model';
import {ProfileForPersonDTO} from '../shared/dto/users/account/ProfileForPersonDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) {}

  getProfileDetailsForPerson(): Observable<ProfileForPersonDTO> {
    return this.httpClient.get<ProfileForPersonDTO>(environment.apiHost + "/accounts/profile");
  }

  getProfileByEmail(email: string): Observable<any> {
    return this.httpClient.get(environment.apiHost + "/accounts/active/" + email);
  }

  changePassword(changePasswordDTO: ChangePasswordDTO): Observable<any> {
    return this.httpClient.post(environment.apiHost + "/accounts/change-password", changePasswordDTO);
  }

  deactivateAccount(): Observable<any> {
    return this.httpClient.post(environment.apiHost + "/accounts/deactivate", {});
  }

  editProfileInformation(updatePersonDTO: UpdatePersonDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts", updatePersonDTO);
  }

  editCompanyInformation(updateCompanyAccount: UpdateCompanyAccountDTO): Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts/company", updateCompanyAccount);
  }

  getPerson(id: string): Observable<any> {
    return this.httpClient.get(environment.apiHost + "/persons/" + id );
  }

  addAttending( eventId: string): Observable<any> {
    return this.httpClient.post(environment.apiHost + "/persons/attending-events/"  + eventId,{});
  }

  upgradeToOD() : Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts/upgrade-to-OD",{} );
  }

  upgradeToPUP( details: DetailedServiceProviderDTO ) : Observable<any> {
    return this.httpClient.put(environment.apiHost + "/accounts/upgrade-to-PUP",details );
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

  addEventToFavorites(eventId: string): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/persons/favorite-events/' + eventId, {});
  }

  removeEventFromFavorites(eventId: string): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/persons/favorite-events/' + eventId);
  }

  changeProfilePicture(newProfilePicture: string): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/accounts/change-profile-picture', newProfilePicture);
  }

  changeCompanyPictures(companyPhotos: string[]): Observable<any> {
    return this.httpClient.post(environment.apiHost + '/service-providers/change-company-pictures', companyPhotos);
  }

}
