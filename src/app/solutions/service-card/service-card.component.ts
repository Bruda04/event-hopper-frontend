import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ProductDTO} from '../../shared/dto/solutions/productDTO.model';
import {environment} from '../../../env/envirements';


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

  protected readonly environment = environment;
}
