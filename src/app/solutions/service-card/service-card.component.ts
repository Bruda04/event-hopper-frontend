import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ProductDTO} from '../../shared/dto/solutions/productDTO.model';
import {environment} from '../../../env/envirements';
import {Router} from '@angular/router';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {

  @Input() service: ProductDTO;

  @Output()
  clicked: EventEmitter<ProductDTO> = new EventEmitter<ProductDTO>();

  constructor(private router: Router) {
  }

  onCardClicked(): void {
    this.clicked.emit(this.service)
  }

  viewMore( id:string): void{
    this.router.navigate(['/solutions/' + id ]);
  }

  protected readonly environment = environment;
}
