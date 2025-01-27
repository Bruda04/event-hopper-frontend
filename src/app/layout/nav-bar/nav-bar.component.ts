import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../authentication/services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { NotificationComponent } from '../../notification/notification/notification.component';
import {User} from '../../shared/model/user.model';
import {WebSocketService} from '../../authentication/services/web-sockets/web-socket.service';
import {BookingAServiceComponent} from '../../reservation/booking-a-service/booking-a-service.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvitePeopleComponent} from '../../invitation/invite-people/invite-people.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoginRoute: boolean = false;
  isRegisterRoute: boolean = false;
  isHomeRoute: boolean = false;
  user: User;
  loggedIn: boolean = false;

  showNotificationsPanel: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef  ,
    private webSocketService: WebSocketService,
    public dialog: MatDialog,
  ) {
    // Listen for route changes
    this.router.events.subscribe(() => {
      this.user = this.userService.getUserData();
      if(this.user == null){
        this.loggedIn = false;
      }else{
        this.loggedIn = this.user.id != null;
      }

      this.isLoginRoute = this.router.url === '/login';
      this.isRegisterRoute =
        this.router.url === '/register' ||
        this.router.url === '/register-user' ||
        this.router.url === '/register-organizer' ||
        this.router.url === '/register-pup';
      this.isHomeRoute =
        this.router.url === '/home' ||
        this.router.url === '/';
    });
  }

  logout() {
    this.loggedIn = false;
    this.userService.clearToken();
    this.user = null;
    this.router.navigate(['/login']);  // Redirect to login after logout

    this.webSocketService.disconnect();

    // Manually trigger change detection to update the view
    this.cdr.detectChanges();
  }

  //@ViewChild('notificationContainer', { read: ViewContainerRef }) container!: ViewContainerRef;


  toggleNotificationsPanel(): void {
    this.showNotificationsPanel = !this.showNotificationsPanel;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('app-notification');
    const clickedButton = (event.target as HTMLElement).closest('.notification-button');


    if (!clickedInside && !clickedButton) {
      this.showNotificationsPanel = false;
    }
  }

  booking() {
    console.log("booking");
    const dialogRef: MatDialogRef<BookingAServiceComponent> = this.dialog.open(BookingAServiceComponent, {
      minWidth: '70vw',
      maxWidth: '70vw',
      minHeight: '70vh',
      maxHeight: '70vh',
    });
  }
}
