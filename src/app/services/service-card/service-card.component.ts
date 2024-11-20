import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {

  @Input() service: Service;

  @Output()
  clicked: EventEmitter<Service> = new EventEmitter<Service>();

  onCardClicked(): void {
    this.clicked.emit(this.service)
  }
}
