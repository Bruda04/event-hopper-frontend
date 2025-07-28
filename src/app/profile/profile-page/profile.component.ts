import { Component } from '@angular/core';
import { UserService} from '../../authentication/services/user.service';
import { Router } from '@angular/router';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import {ProfileService} from '../profile.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import {ConfirmDeactivationComponent} from '../confirm-deactivation/confirm-deactivation.component';
import {EditAccountInformationComponent} from '../edit-account-information/edit-account-information.component';
import {EditCompanyInformationComponent} from '../edit-company-information/edit-company-information.component';
import {User} from '../../shared/model/user.model';
import {UpgradingComponent} from '../../authentication/upgrading/upgrading.component';
import {environment} from '../../../env/envirements';
import {ImageServiceService} from '../../shared/services/image-service.service';
import {
  EditServiceProviderPhotosComponent
} from '../edit-service-provider-photos/edit-service-provider-photos.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User;
  profilePicture: string;
  loadedUser = false;

  constructor(private userService: UserService,
              private router: Router,
              private profileService: ProfileService,
              public dialog: MatDialog,
              private imageService: ImageServiceService) {
    this.user = this.userService.getUserData();
  }

  ngOnInit() {
    this.profileService.getProfileDetailsForPerson().subscribe({
      next: (response)  => {
        this.user.email = response.email;
        this.user.profilePicture = response.profilePicture;
        this.user.name = response.name;
        this.user.surname = response.surname;
        this.user.address = response.location.address;
        this.user.city = response.location.city;
        this.user.phoneNumber = response.phoneNumber;
        this.user.favoriteEvents = response.favoriteEvents;
        this.user.attendingEvents = response.attendingEvents;
        this.user.favoriteSolutions = response.favoriteProducts;
        if(this.user.role === 'EVENT_ORGANIZER'){
          this.user.myEvents = response.myEvents;
        }
        if(this.user.role === 'SERVICE_PROVIDER'){
          this.user.companyName = response.companyName;
          this.user.companyEmail = response.companyEmail;
          this.user.companyPhoneNumber = response.companyPhoneNumber;
          this.user.companyDescription = response.companyDescription;
          this.user.companyLocation = response.companyLocation;
          this.user.companyPhotos = response.companyPhotos;
          this.user.workStart = response.workStart;
          this.user.workEnd = response.workEnd;
        }
        if(this.user.profilePicture == "" || this.user.profilePicture == null){
          this.profilePicture = "profile.png";
        }else{
          this.profilePicture = environment.apiImagesHost + this.user.profilePicture;
        }
        this.loadedUser = true;
      },




      error: (err) => {
        console.error('No user found error:', err);
      },
    });
  }

  openViewMyEvents(): void {
    this.router.navigate(['/my-events']);
  }

  openEditCompanyImages(): void{
    const dialogRef = this.dialog.open(EditServiceProviderPhotosComponent, {
      width: '700px',
      height: '400px',
      data: this.user.companyPhotos
    });


    dialogRef.afterClosed().subscribe((result) => {
      if(result!= null){
        this.profileService.changeCompanyPictures(result).subscribe({
          next: ()=>{
            if(result != null){
              this.user.companyPhotos = result;
            }

            console.log("Images changed.")
          },
          error: (err: { error?: { message?: string } }) =>{
            console.error("Error with changing company photos", err);
          },
        })
      }

    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeactivationComponent, {
      width: '400px',
    });


  }

  openEditAccountInformation(): void {
    const dialogRef = this.dialog.open(EditAccountInformationComponent, {
      width: '500px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user.name = result.person.name;
        this.user.surname = result.person.surname;
        this.user.address = result.person.location.address;
        this.user.city = result.person.location.city;
        this.user.phoneNumber = result.person.phoneNumber;
      }

    });
  }

  openEditCompanyInformation(): void {
    const dialogRef = this.dialog.open(EditCompanyInformationComponent, {
      width: '500px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.user.companyPhoneNumber = result.companyPhoneNumber;
        this.user.companyDescription = result.companyDescription;
        this.user.companyLocation = result.companyLocation;
      }

    });
  }

  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '500px'
    });
  }

  openUpgradingDialog():void {
    this.dialog.open(UpgradingComponent, {
      width: '500px'
    });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;


    this.imageService.uploadImage(files[0]).subscribe({
      next: (url: string) => {
        this.user.profilePicture = url;
        this.profilePicture = environment.apiImagesHost + url;

        this.profileService.changeProfilePicture(url).subscribe({
          next: () => {
            console.log("Profile picture changed.")
          },error: () => {
            console.log("Profile picture error.")
          },
        });

        }, error: (err: { error?: { message?: string } }) => {
        console.error('Error uploading image:', err);
      },
    });

  }


  protected readonly environment = environment;
}
