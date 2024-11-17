import { Injectable } from '@angular/core';
import {Service} from './model/service.model';

const dataSource = [
  {
    name: "CHERO's Candles",
    description: 'Lorem Ipsum is simply dummy text',
    basePrice: 300,
    discount: 30,
    finalPrice: 210,
    visible: true,
    available: true,
    duration: 60,
    cancellationWindow: 1,
    reservationWindow: 1
  },
  {
    name: "Lavender Bliss",
    description: 'Relaxing lavender scented candle',
    basePrice: 250,
    discount: 20,
    finalPrice: 200,
    visible: true,
    available: true,
    duration: 50,
    cancellationWindow: 2,
    reservationWindow: 2
  },
  {
    name: "Vanilla Dream",
    description: 'Sweet vanilla scented candle',
    basePrice: 280,
    discount: 25,
    finalPrice: 210,
    visible: true,
    available: true,
    duration: 55,
    cancellationWindow: 1,
    reservationWindow: 1
  },
  {
    name: "Ocean Breeze",
    description: 'Fresh ocean breeze scented candle',
    basePrice: 320,
    discount: 30,
    finalPrice: 224,
    visible: true,
    available: true,
    duration: 60,
    cancellationWindow: 3,
    reservationWindow: 3
  },
  {
    name: "Citrus Burst",
    description: 'Energizing citrus scented candle',
    basePrice: 270,
    discount: 15,
    finalPrice: 229.5,
    visible: true,
    available: true,
    duration: 45,
    cancellationWindow: 2,
    reservationWindow: 2
  },
  {
    name: "Rose Garden",
    description: 'Romantic rose scented candle',
    basePrice: 290,
    discount: 20,
    finalPrice: 232,
    visible: true,
    available: true,
    duration: 50,
    cancellationWindow: 1,
    reservationWindow: 1
  },
  {
    name: "Minty Fresh",
    description: 'Refreshing mint scented candle',
    basePrice: 260,
    discount: 10,
    finalPrice: 234,
    visible: true,
    available: true,
    duration: 40,
    cancellationWindow: 2,
    reservationWindow: 2
  },
  {
    name: "Spicy Cinnamon",
    description: 'Warm cinnamon scented candle',
    basePrice: 300,
    discount: 25,
    finalPrice: 225,
    visible: true,
    available: true,
    duration: 60,
    cancellationWindow: 1,
    reservationWindow: 1
  },
  {
    name: "Tropical Paradise",
    description: 'Exotic tropical fruit scented candle',
    basePrice: 310,
    discount: 20,
    finalPrice: 248,
    visible: true,
    available: true,
    duration: 55,
    cancellationWindow: 3,
    reservationWindow: 3
  },
  {
    name: "Woodland Escape",
    description: 'Earthy woodland scented candle',
    basePrice: 280,
    discount: 15,
    finalPrice: 238,
    visible: true,
    available: true,
    duration: 50,
    cancellationWindow: 2,
    reservationWindow: 2
  },
  {
    name: "Berry Delight",
    description: 'Sweet berry scented candle',
    basePrice: 270,
    discount: 10,
    finalPrice: 243,
    visible: true,
    available: true,
    duration: 45,
    cancellationWindow: 1,
    reservationWindow: 1
  }
];

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private servicesList :Service[] = []

  constructor() {
    for (let data of dataSource) {
      const service: Service = {
        id: Math.random(),
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        discount: data.discount,
        finalPrice: data.finalPrice,
        visible: data.visible,
        available: data.available,
        duration: data.duration,
        cancellationWindow: data.cancellationWindow,
        reservationWindow: data.reservationWindow
      }
      this.servicesList.push(service);
    }
  }

  getAll(): Service[] {
    return this.servicesList;
  }

  add(service: Service) {
    this.servicesList.push(service);
  }

  remove(service: Service) {
    this.servicesList = this.servicesList.filter(s => s.id !== service.id);
  }
}
