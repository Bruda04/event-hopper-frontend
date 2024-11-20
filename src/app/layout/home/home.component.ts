import { Component } from '@angular/core';
import { Event } from '../../event/model/event.model';
import { Service } from '../../services/model/service.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('slideInOut', [
      state('void', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent {

  top5events: Event[] = [
    {
      id: 1,
      name: "Tech Conference 2024",
      maxAttendence: 500,
      description: "A conference for tech enthusiasts to explore the latest in technology.",
      privacy: false,
      time: new Date('2024-12-15T10:00:00'),
      location: "123 Tech Street, Silicon Valley, CA",
      picture: "https://www.spiceworks.com/tech/tech-general/articles/top-10-tech-events-september/"
    },
    {
      id: 2,
      name: "Music Festival",
      maxAttendence: 2000,
      description: "An outdoor music festival featuring local and international artists.",
      privacy: false,
      time: new Date('2024-12-20T18:00:00'),
      location: "Central Park, New York, NY",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 3,
      name: "Private Networking Dinner",
      maxAttendence: 50,
      description: "Exclusive dinner for top professionals in the tech industry.",
      privacy: true,
      time: new Date('2024-12-18T20:00:00'),
      location: "The Grand Hotel, Room 305, San Francisco, CA",
      picture: "https://via.placeholder.com/300x200"
    }
  ];


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
    },
    {
      id: 2,
      name: "Music Festival",
      maxAttendence: 2000,
      description: "An outdoor music festival featuring local and international artists.",
      privacy: false,
      time: new Date('2024-12-20T18:00:00'),
      location: "Central Park, New York, NY",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 3,
      name: "Private Networking Dinner",
      maxAttendence: 50,
      description: "Exclusive dinner for top professionals in the tech industry.",
      privacy: true,
      time: new Date('2024-12-18T20:00:00'),
      location: "The Grand Hotel, Room 305, San Francisco, CA",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 4,
      name: "Art Exhibition",
      maxAttendence: 300,
      description: "A display of modern art from emerging artists around the world.",
      privacy: false,
      time: new Date('2024-12-22T14:00:00'),
      location: "Art Gallery, Downtown Chicago, IL",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 5,
      name: "Startup Pitch Night",
      maxAttendence: 150,
      description: "A night where startups showcase their ideas to potential investors.",
      privacy: false,
      time: new Date('2024-12-16T19:00:00'),
      location: "Tech Hub, Boston, MA",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 6,
      name: "Yoga Retreat",
      maxAttendence: 25,
      description: "A relaxing yoga retreat for mindfulness and rejuvenation.",
      privacy: true,
      time: new Date('2024-12-19T08:00:00'),
      location: "Mountain Resort, Aspen, CO",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 7,
      name: "Gaming Tournament",
      maxAttendence: 1000,
      description: "A competitive gaming event with prizes for top players.",
      privacy: false,
      time: new Date('2024-12-21T12:00:00'),
      location: "Esports Arena, Los Angeles, CA",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 8,
      name: "Charity Gala",
      maxAttendence: 400,
      description: "A formal event to raise funds for local charities.",
      privacy: true,
      time: new Date('2024-12-17T18:30:00'),
      location: "The Grand Ballroom, Miami, FL",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 9,
      name: "Book Launch",
      maxAttendence: 100,
      description: "Launch event for the latest novel by a renowned author.",
      privacy: false,
      time: new Date('2024-12-23T15:00:00'),
      location: "City Library, Seattle, WA",
      picture: "https://via.placeholder.com/300x200"
    },
    {
      id: 10,
      name: "Film Screening",
      maxAttendence: 200,
      description: "Exclusive screening of an upcoming indie film.",
      privacy: true,
      time: new Date('2024-12-14T20:00:00'),
      location: "Cinema Hall, Austin, TX",
      picture: "https://via.placeholder.com/300x200"
    }
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
