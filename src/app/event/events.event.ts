import { Injectable } from '@angular/core';
import {Event} from './model/event.model';

const dataSource= [
    {
        id: 1,
        name: "Tech Conference 2024",
        maxAttendence: 500,
        description: "A conference for tech enthusiasts to explore the latest in technology.",
        privacy: false,
        time: new Date('2024-12-15T10:00:00'), // ISO 8601 format
        location: "123 Tech Street, Silicon Valley, CA",
        picture: "https://via.placeholder.com/300x200"
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
        description: "An exhibition showcasing the works of contemporary artists.",
        privacy: false,
        time: new Date('2024-12-25T15:00:00'),
        location: "Art Museum, Los Angeles, CA",
        picture: "https://via.placeholder.com/300x200"
      },
      {
        id: 5,
        name: "Cooking Masterclass",
        maxAttendence: 20,
        description: "Join this hands-on cooking session with a renowned chef.",
        privacy: true,
        time: new Date('2024-12-22T14:00:00'),
        location: "Chef's Studio, 456 Culinary Lane, Chicago, IL",
        picture: "https://via.placeholder.com/300x200"
      }
];



@Injectable({
    providedIn : 'root'
})

export class EventsEvent{

    private eventsList: Event[] =[]

    constructor(){
        for (let data of dataSource){
            const event:Event = {
                id: Math.random(),
                name:data.name,
                description: data.description,
                maxAttendence : data.maxAttendence,
                privacy: data.privacy,
                time: data.time,
                location: data.location,
                picture: data.picture

            }

            this.eventsList.push(event)
        
        }
    }

    getAll(): Event[]{
        return this.eventsList;
    }

    add(event:Event):void{
        event.id = Math.random();
        this.eventsList.push(event)
    }

    remove(event:Event):void{
        this.eventsList = this.eventsList.filter((e:Event) => e.id !== event.id);
    }

}