import { Injectable } from '@angular/core';
import {EventType} from '../model/eventType.model';


const dataSource = [
  {
    name: "Birthday Party",
    description: "A celebration of someone's birth anniversary.",
    isDeactivated: false,
    events: ["John's 30th Birthday", "Sophia's Sweet 16"],
    suggestedSolutionCategories: ["Catering", "Party Decorations", "DJ", "Cake"]
  },
  {
    name: "Corporate Meeting",
    description: "A formal gathering for business purposes.",
    isDeactivated: true,
    events: ["Annual Sales Meeting", "Q4 Strategic Planning"],
    suggestedSolutionCategories: ["AV Equipment", "Catering", "Notepads", "Event Host"]
  },
  {
    name: "Baby Shower",
    description: "A celebration to honor an upcoming or recent birth.",
    isDeactivated: false,
    events: ["Emily's Baby Shower"],
    suggestedSolutionCategories: ["Party Decorations", "Catering", "Gifts", "Games"]
  },
  {
    name: "Charity Gala",
    description: "A formal event to raise funds for a cause.",
    isDeactivated: true,
    events: ["Red Cross Annual Gala", "Wildlife Fundraising Dinner"],
    suggestedSolutionCategories: ["Catering", "Photography", "Auctioneer", "Entertainment"]
  },
  {
    name: "Sports Tournament",
    description: "A competitive series of matches or games.",
    isDeactivated: false,
    events: ["Local Soccer Cup", "National Tennis Championship"],
    suggestedSolutionCategories: ["Photography", "Security", "Medals", "Event Host"]
  },
  {
    name: "Engagement Party",
    description: "A celebration to announce a couple's engagement.",
    isDeactivated: false,
    events: ["Mike and Sarah's Engagement"],
    suggestedSolutionCategories: ["Catering", "DJ", "Party Decorations", "Photography"]
  },
  {
    name: "Conference",
    description: "A formal meeting for discussion, often with a large audience.",
    isDeactivated: false,
    events: ["Tech Innovators Conference", "Healthcare Annual Summit"],
    suggestedSolutionCategories: ["AV Equipment", "Catering", "Security", "Photography"]
  },
  {
    name: "Exhibition",
    description: "An organized display of items or works for public viewing.",
    isDeactivated: false,
    events: ["Art Expo 2024", "Car Show"],
    suggestedSolutionCategories: ["Lighting", "Security", "Booth Setup", "Signage"]
  },
  {
    name: "Workshop",
    description: "An interactive training or educational event.",
    isDeactivated: false,
    events: ["Digital Marketing Workshop", "Pottery Making Class"],
    suggestedSolutionCategories: ["AV Equipment", "Snacks", "Stationery", "Marketing"]
  },
  {
    name: "Reunion",
    description: "A gathering of people who have not met for a long time.",
    isDeactivated: false,
    events: ["Class of 2000 Reunion", "Family Reunion"],
    suggestedSolutionCategories: ["Catering", "Photography", "Games", "Event Host"]
  },
  {
    name: "Fashion Show",
    description: "An event showcasing clothing and accessories on a runway.",
    isDeactivated: false,
    events: ["Spring Collection Showcase", "Luxury Evening Wear Gala"],
    suggestedSolutionCategories: ["Stylist", "MakeUp Artist", "Lighting", "Music"]
  },
  {
    name: "Wedding",
    description: "A large gathering that joins a couple in marriage.",
    isDeactivated: false,
    events: ["Mary and Jake's wedding", "Josh and Mark's wedding"],
    suggestedSolutionCategories: ["Invitations", "Band", "DJ", "Cake"]
  },
  {
    name: "Graduation",
    description: "A large gathering celebrating ones graduation from an educational institution.",
    isDeactivated: false,
    events: ["Gilmore High Graduation"],
    suggestedSolutionCategories: ["Band", "DJ", "Party Decorations"]
  },
  {
    name: "Movie Premiere",
    description: "A first time premiere of a movie.",
    isDeactivated: false,
    events: ["Gladiator Movie Premiere", "The Godfather Movie Premiere", "Pulp Fiction Movie Premiere"],
    suggestedSolutionCategories: ["Photography", "Stylist", "MakeUp Artist", "Carpets"]
  }
];







@Injectable({
  providedIn: 'root'
})
export class EventTypesService {
  private eventTypesList :EventType[] = []

  constructor() {
    for (let data of dataSource) {
      const eventType: EventType = {
        name: data.name,
        description: data.description,
        events: data.events,
        suggestedSolutionCategories: data.suggestedSolutionCategories,
        isDeactivated: data.isDeactivated || false
      }
      this.eventTypesList.push(eventType);
    }
  }

  getEventTypes(): EventType[] {
    return this.eventTypesList;
  }

  add(eventType: EventType): void {
    eventType.isDeactivated = false;
    this.eventTypesList.push(eventType);
  }

  remove(eventType: EventType): void {
    const event = this.eventTypesList.find((c: EventType) => c.id === eventType.id);
    if (event) {
      event.isDeactivated = true;
    }
  }

  update(eventType: EventType): void {
    const index: number = this.eventTypesList.findIndex((c: EventType) => c.id === eventType.id);
    this.eventTypesList[index] = eventType;
  }

}
