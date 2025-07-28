import {ChangeDetectorRef, Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-pup-confirmation',
  templateUrl: './pup-confirmation.component.html',
  styleUrl: './pup-confirmation.component.css'
})
export class PupConfirmationComponent {
   constructor(private userService: UserService, private cdr: ChangeDetectorRef,
   ) { }
  ngOnInit() {
    this.userService.clearToken();
    this.cdr.detectChanges();
  }

}
