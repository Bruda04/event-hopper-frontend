import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any; // Variable to store the user object

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the user object passed via router state using ActivatedRoute
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.user = JSON.parse(params['user']);
        console.log('User data:', this.user);
      } else {
        console.log('No user data found!');
      }
    });
  }
}
