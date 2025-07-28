import {Component, ViewChild} from '@angular/core';
import {PUPServiceManagementComponent} from '../pupservice-management/pupservice-management.component';
import {PriceListManagementComponent} from '../price-list-management/price-list-management.component';
import {PupProductManagementComponent} from '../pup-product-management/pup-product-management.component';

@Component({
  selector: 'app-pupservice-product-management',
  templateUrl: './pupservice-product-management.component.html',
  styleUrl: './pupservice-product-management.component.css'
})
export class PUPServiceProductManagementComponent {
  @ViewChild('services') servicesTab: PUPServiceManagementComponent;
  @ViewChild('prices') pricesTab: PriceListManagementComponent;
  @ViewChild('products') productManagementTab: PupProductManagementComponent;

  refreshServices(): void {
    this.servicesTab.loadPagedEntities();
  }

  refreshPrices(): void {
    this.pricesTab.loadPrices();
  }
}
