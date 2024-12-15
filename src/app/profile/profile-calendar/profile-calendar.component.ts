import { Component } from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-profile-calendar',
  templateUrl: './profile-calendar.component.html',
  styleUrl: './profile-calendar.component.css'
})
export class ProfileCalendarComponent {
  view: CalendarView = CalendarView.Month; // Default calendar view
  CalendarView = CalendarView; // Enum for calendar views
  viewDate: Date = new Date(); // Current date

  // Mocked events - ove eventove bi vukli sa bekenda.
  events: CalendarEvent[] = [
    {
      title: 'Team Meeting',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)), // 1-hour event
      color: { primary: '#e3bc08', secondary: '#FDF1BA' },
      draggable: false,
    },
    {
      title: 'Project Deadline',
      start: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      draggable: false,
    },
    {
      title: 'Code Review',
      start: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      draggable: false,
    },
  ];

  refresh = new Subject<void>(); // For refreshing the calendar view

  // Handle event click
  handleEvent(action: string, event: CalendarEvent): void {
    console.log(`${action}:`, event);
    alert(`Event: ${event.title}\nStarts at: ${event.start}\nEnds at: ${event.end}`);
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
