import { Component } from '@angular/core';
import { Event } from '../../event/model/event.model';
import { Service } from '../../services/model/service.model';

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

  // carouselOptions = {
  //   items: 1,         // Broj stavki po stranici
  //   loop: false,       // Da li se carousel ponavlja
  //   margin: 10,       // Razmak između stavki
  //   autoplay: true,   // Da li carousel automatski prelazi na sledeći slide
  //   nav: true,        // Omogućava navigacione strelice
  //   dots: true,       // Omogućava indikatore tačaka
    
  // };

  currentIndex = 0;

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
  
}
