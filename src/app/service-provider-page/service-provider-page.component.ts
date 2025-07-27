import {Component, OnInit} from '@angular/core';
import {ServiceProviderDetailsDTO} from '../shared/dto/users/serviceProvider/serviceProviderDetailsDTO.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../authentication/services/user.service";
import {ProfileService} from '../profile/profile.service';
import {environment} from "../../env/envirements";
import {UserData} from '../shared/model/userData.model';

@Component({
  selector: 'app-service-provider-page',
  templateUrl: './service-provider-page.component.html',
  styleUrl: './service-provider-page.component.css'
})
export class ServiceProviderPageComponent implements OnInit{
  providerId: string;
  provider: ServiceProviderDetailsDTO;
  notFound: boolean = false;
  user: UserData;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.providerId = this.route.snapshot.paramMap.get('id');
    this.loadProvider();
    this.user = this.userService.getUserData()
  }

  loadProvider(): void {
    this.profileService.getServiceProviderDetails(this.providerId).subscribe(
      {
        next: (provider: ServiceProviderDetailsDTO): void => {
          this.provider = provider;
          this.provider.comments.map(c =>
            c.author.profilePicture = c.author.profilePicture ? environment.apiImagesHost + c.author.profilePicture : 'profile.png');
          this.provider.profilePicture = this.provider.profilePicture ? environment.apiImagesHost + this.provider.profilePicture : 'profile.png';
        },
        error: () : void=> {
          this.notFound = true;
        }
      }
    );
  }

  // TODO: Implement this method
  block():void {

  }

  // TODO Implement this method
  report() {

  }

    protected readonly environment = environment;
}
