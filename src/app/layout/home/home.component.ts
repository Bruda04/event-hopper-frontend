import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStateService } from '../../authentication/services/navigation-state.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any; 

  constructor(private router: Router, private navigationStateService: NavigationStateService) { }

  ngOnInit(): void {
    this.user = this.navigationStateService.getUserData();

    if (!this.user) {
      console.log('No user data found!');
    } else {
      console.log(this.user);
      
    }
  }
}
