import { Component } from '@angular/core';
import { Event } from '../../event/model/event.model';
import { Service } from '../../services/model/service.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  events: Event[] = [
    {
      id: 1,
      name: "Tech Conference 2024",
      maxAttendence: 500,
      description: "A conference for tech enthusiasts to explore the latest in technology.",
      privacy: false,
      time: new Date('2024-12-15T10:00:00'),
      location: "123 Tech Street, Silicon Valley, CA",
      picture: "https://www.spiceworks.com/tech/tech-general/articles/top-10-tech-events-september/"
    }
    // {
    //   id: 2,
    //   name: "Music Festival",
    //   maxAttendence: 2000,
    //   description: "An outdoor music festival featuring local and international artists.",
    //   privacy: false,
    //   time: new Date('2024-12-20T18:00:00'),
    //   location: "Central Park, New York, NY",
    //   picture: "https://via.placeholder.com/300x200"
    // },
    // {
    //   id: 3,
    //   name: "Private Networking Dinner",
    //   maxAttendence: 50,
    //   description: "Exclusive dinner for top professionals in the tech industry.",
    //   privacy: true,
    //   time: new Date('2024-12-18T20:00:00'),
    //   location: "The Grand Hotel, Room 305, San Francisco, CA",
    //   picture: "https://via.placeholder.com/300x200"
    // }
  ];

  currentIndex = 0;
  showEventFilterPanel: boolean = false; // Inicijalno stanje filter panela
  showSolutionFilterPanel: boolean = false; // Inicijalno stanje filter panela

  locations: string[] = ['Novi Sad', 'Belgrade', 'Budapest', 'New York'];
  eventTypes: string[] = ['Wedding', 'Birthday', 'Concert'];
  categories: string[] = ['Catering','Decoration', 'Music'];

  filterForm: FormGroup= new FormGroup({
    category: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number>(null, [Validators.min(0)]),
    availability: new FormControl<string>(''),
  });


  get transformStyle(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  moveSlide(direction: number): void {
    const totalSlides = this.events.length;
    this.currentIndex += direction;

    if (this.currentIndex < 0) {
      this.currentIndex = totalSlides - 1;
    } else if (this.currentIndex >= totalSlides) {
      this.currentIndex = 0;
    }
  }


  toggleEventFilterPanel(): void {
    this.showEventFilterPanel = !this.showEventFilterPanel; // Menja stanje panela
  }


  toggleSolutionFilterPanel(): void {
    this.showSolutionFilterPanel = !this.showSolutionFilterPanel; // Menja stanje panela
  }

  applyFilters(): void {
    if (this.filterForm.valid) {
      return;
    } else {
      this.filterForm.markAsTouched();
    }
  }

  resetFilters(): void {
    this.filterForm.patchValue({
      category: '',
      eventType: '',
      minPrice: null,
      maxPrice: null,
      availability: ''
    });
  }


}
