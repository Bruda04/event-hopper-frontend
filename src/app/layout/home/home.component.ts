import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStateService } from '../../authentication/services/navigation-state.service';

import { Event } from '../../event/model/event.model';
import { Service } from '../../services/model/service.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
//import { getAll } from '../../services/services.service';


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

  top5solutions: Service[] = [
    {
      id: 1,
      name: "Web Development",
      description: "Complete web development including front-end and back-end solutions.",
      category: "Technology",
      eventType: ["Conference", "Workshop"],
      basePrice: 500,
      discount: 10,
      finalPrice: 450,
      visible: true,
      available: true,
      duration: 8,
      cancellationWindow: 24,
      reservationWindow: 48,
      autoAccept: true
    },
    {
      id: 2,
      name: "Graphic Design",
      description: "Custom logo and branding design for businesses.",
      category: "Design",
      eventType: ["Meeting", "Workshop"],
      basePrice: 300,
      discount: 15,
      finalPrice: 255,
      visible: true,
      available: true,
      duration: 5,
      cancellationWindow: 12,
      reservationWindow: 24,
      autoAccept: false
    },
    {
      id: 3,
      name: "SEO Optimization",
      description: "Improving website visibility and search rankings.",
      category: "Marketing",
      eventType: ["Consultation", "Webinar"],
      basePrice: 200,
      discount: 5,
      finalPrice: 190,
      visible: true,
      available: false,
      duration: 6,
      cancellationWindow: 48,
      reservationWindow: 72,
      autoAccept: true
    },
    {
      id: 4,
      name: "Mobile App Development",
      description: "Design and development of mobile applications for Android and iOS.",
      category: "Technology",
      eventType: ["Workshop", "Conference"],
      basePrice: 800,
      discount: 20,
      finalPrice: 640,
      visible: true,
      available: true,
      duration: 10,
      cancellationWindow: 24,
      reservationWindow: 48,
      autoAccept: false
    },
    {
      id: 5,
      name: "Digital Marketing Strategy",
      description: "Developing strategies for online marketing, social media, and advertising.",
      category: "Marketing",
      eventType: ["Consultation", "Seminar"],
      basePrice: 400,
      discount: 10,
      finalPrice: 360,
      visible: true,
      available: true,
      duration: 7,
      cancellationWindow: 12,
      reservationWindow: 24,
      autoAccept: true
    },
  ]

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

  solutions: Service[]=[
    {
      id: 1,
      name: "Web Development",
      description: "Complete web development including front-end and back-end solutions.",
      category: "Technology",
      eventType: ["Conference", "Workshop"],
      basePrice: 500,
      discount: 10,
      finalPrice: 450,
      visible: true,
      available: true,
      duration: 8,
      cancellationWindow: 24,
      reservationWindow: 48,
      autoAccept: true
    },
    {
      id: 2,
      name: "Graphic Design",
      description: "Custom logo and branding design for businesses.",
      category: "Design",
      eventType: ["Meeting", "Workshop"],
      basePrice: 300,
      discount: 15,
      finalPrice: 255,
      visible: true,
      available: true,
      duration: 5,
      cancellationWindow: 12,
      reservationWindow: 24,
      autoAccept: false
    },
    {
      id: 3,
      name: "SEO Optimization",
      description: "Improving website visibility and search rankings.",
      category: "Marketing",
      eventType: ["Consultation", "Webinar"],
      basePrice: 200,
      discount: 5,
      finalPrice: 190,
      visible: true,
      available: false,
      duration: 6,
      cancellationWindow: 48,
      reservationWindow: 72,
      autoAccept: true
    },
    {
      id: 4,
      name: "Mobile App Development",
      description: "Design and development of mobile applications for Android and iOS.",
      category: "Technology",
      eventType: ["Workshop", "Conference"],
      basePrice: 800,
      discount: 20,
      finalPrice: 640,
      visible: true,
      available: true,
      duration: 10,
      cancellationWindow: 24,
      reservationWindow: 48,
      autoAccept: false
    },
    {
      id: 5,
      name: "Digital Marketing Strategy",
      description: "Developing strategies for online marketing, social media, and advertising.",
      category: "Marketing",
      eventType: ["Consultation", "Seminar"],
      basePrice: 400,
      discount: 10,
      finalPrice: 360,
      visible: true,
      available: true,
      duration: 7,
      cancellationWindow: 12,
      reservationWindow: 24,
      autoAccept: true
    },
    {
      id: 6,
      name: "Photography Services",
      description: "Professional photography for events, products, and portraits.",
      category: "Photography",
      eventType: ["Event", "Wedding"],
      basePrice: 600,
      discount: 25,
      finalPrice: 450,
      visible: true,
      available: true,
      duration: 5,
      cancellationWindow: 48,
      reservationWindow: 72,
      autoAccept: false
    },
    {
      id: 7,
      name: "Content Writing",
      description: "High-quality blog posts, articles, and web content writing services.",
      category: "Writing",
      eventType: ["Consultation", "Workshop"],
      basePrice: 150,
      discount: 10,
      finalPrice: 135,
      visible: true,
      available: true,
      duration: 4,
      cancellationWindow: 24,
      reservationWindow: 48,
      autoAccept: true
    },
    {
      id: 8,
      name: "Video Production",
      description: "Creating promotional, training, and event videos.",
      category: "Media",
      eventType: ["Workshop", "Event"],
      basePrice: 1000,
      discount: 30,
      finalPrice: 700,
      visible: true,
      available: true,
      duration: 12,
      cancellationWindow: 72,
      reservationWindow: 96,
      autoAccept: true
    },
    {
      id: 9,
      name: "IT Support",
      description: "Providing technical support for hardware and software issues.",
      category: "Technology",
      eventType: ["Consultation", "Service"],
      basePrice: 100,
      discount: 5,
      finalPrice: 95,
      visible: true,
      available: true,
      duration: 3,
      cancellationWindow: 24,
      reservationWindow: 48,
      autoAccept: false
    },
    {
      id: 10,
      name: "Virtual Assistant",
      description: "Providing remote administrative and personal assistance.",
      category: "Services",
      eventType: ["Consultation", "Meeting"],
      basePrice: 250,
      discount: 10,
      finalPrice: 225,
      visible: true,
      available: true,
      duration: 8,
      cancellationWindow: 24,
      reservationWindow: 48,
      autoAccept: true
    }
  ];


  currentIndex = 0;
  showEventFilterPanel: boolean = false; // Inicijalno stanje filter panela
  showSolutionFilterPanel: boolean = false; // Inicijalno stanje filter panela

  locations: string[] = ['Novi Sad', 'Belgrade', 'Budapest', 'New York'];
  eventTypes: string[] = ['Wedding', 'Birthday', 'Concert'];
  categories: string[] = ['Catering','Decoration', 'Music'];

  filterEventForm: FormGroup= new FormGroup({
    location: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    date: new FormControl<Date | null>(null),

  });

  filterSolutionForm: FormGroup= new FormGroup({
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


  //proveriti da li radi
  
  applyFilters(): void {
    if (this.filterSolutionForm.valid || this.filterEventForm.valid) {
      return;
    } else if (!this.filterSolutionForm.valid) {
      this.filterSolutionForm.markAsTouched();
      
    }else if (!this.filterEventForm.valid){
      this.filterEventForm.markAsTouched();
    }
  }

  resetFilters(): void {
    this.filterSolutionForm.patchValue({
      category: '',
      eventType: '',
      minPrice: null,
      maxPrice: null,
      availability: ''
    });

    this.filterEventForm.patchValue({
      location: '',
      eventType: '',
      date: null
    });
  }


}
