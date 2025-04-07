import {Component, Input} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {UserService} from '../../authentication/services/user.service';
import {User} from '../../shared/model/user.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile-calendar',
  templateUrl: './profile-calendar.component.html',
  styleUrl: './profile-calendar.component.css'
})
export class ProfileCalendarComponent {
  user: User;
  @Input() attendingEvents: any[] = [];
  @Input() myEvents: any[] = [];
  events: CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month; // Default calendar view
  CalendarView = CalendarView; // Enum for calendar views
  viewDate: Date = new Date(); // Current date
  yellowColor = { primary: '#e3bc08', secondary: '#FDF1BA' };
  redColor = { primary: '#ad2121', secondary: '#FAE3E3' };
  blueColor = {primary: '#1e90ff', secondary: '#D1E8FF'};

  constructor(private userService: UserService, private router: Router) {
    this.user = userService.getUserData();
  }

  ngOnInit(){
    this.loadCalendarEvents();
  }

  loadCalendarEvents(): void {
    if(this.user.role === 'EVENT_ORGANIZER'){
      for (const event of this.myEvents) {
        const calendarEvent: CalendarEvent = {
          id: event.id,
          title: event.name,
          start: new Date(event.time),
          color: this.yellowColor,
          draggable: false,
        }
        this.events.push(calendarEvent);

      }
    }

    for (const event of this.attendingEvents) {
      const calendarEvent: CalendarEvent = {
        id: event.id,
        title: event.name,
        start: new Date(event.time),
        color: this.blueColor,
        draggable: false,
      }
      this.events.push(calendarEvent);
    }
  }

  refresh = new Subject<void>(); // For refreshing the calendar view

  // Handle event click
  handleEvent(action: string, event: CalendarEvent): void {
    this.router.navigate(['/events/' + event.id]);
  }

  // Set the current view (day, week, month)
  setView(view: CalendarView): void {
    this.view = view;
  }

  // Navigate to today
  goToToday(): void {
    this.viewDate = new Date();
  }

  // Change date (previous or next)
  changeDate(offset: number): void {
    const currentDate = new Date(this.viewDate);
    switch (this.view) {
      case CalendarView.Day:
        currentDate.setDate(currentDate.getDate() + offset);
        break;
      case CalendarView.Week:
        currentDate.setDate(currentDate.getDate() + offset * 7);
        break;
      case CalendarView.Month:
        currentDate.setMonth(currentDate.getMonth() + offset);
        break;
    }
    this.viewDate = currentDate;
  }
}
