import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../model/service.model';
import {ProductDTO} from '../model/productDTO.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {

  @Input() service: ProductDTO;

  @Output()
  clicked: EventEmitter<ProductDTO> = new EventEmitter<ProductDTO>();

  onCardClicked(): void {
    this.clicked.emit(this.service)
  }
}
