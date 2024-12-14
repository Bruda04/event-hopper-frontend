import {Component, OnInit} from '@angular/core';
import {SolutionDetailsDTO} from '../shared/dto/solutions/solutionDetailsDTO.model';
import {ServiceProviderDetailsDTO} from '../shared/dto/users/serviceProvider/serviceProviderDetailsDTO.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../solutions/product.service';
import {UserService} from "../authentication/services/user.service";

@Component({
  selector: 'app-service-provider-page',
  templateUrl: './service-provider-page.component.html',
  styleUrl: './service-provider-page.component.css'
})
export class ServiceProviderPageComponent implements OnInit{
  providerId: string;
  provider: ServiceProviderDetailsDTO;
  notFound: boolean = false;
  user: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private profileService: ProductService) { }

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
}
