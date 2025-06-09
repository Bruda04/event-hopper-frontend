import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { PUPServiceProductManagementComponent } from './pupservice-product-management/pupservice-product-management.component';
import { PUPServiceManagementComponent } from './pupservice-management/pupservice-management.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceCardComponent } from './service-card/service-card.component';
import { SolutionPageComponent } from './solution-page/solution-page.component';
import {CarouselModule} from 'primeng/carousel';
import {EventModule} from '../event/event.module';
import {PrimeTemplate} from 'primeng/api';
import { PriceListManagementComponent } from './price-list-management/price-list-management.component';
import { EditPriceComponent } from './edit-price/edit-price.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import {ChatModule} from "../chat/chat.module";
import { PupProductManagementComponent } from './pup-product-management/pup-product-management.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [
    PUPServiceProductManagementComponent,
    PUPServiceManagementComponent,
    CreateServiceComponent,
    EditServiceComponent,
    ServiceCardComponent,
    SolutionPageComponent,
    PriceListManagementComponent,
    EditPriceComponent,
    ProductReviewComponent,
    PupProductManagementComponent,
    CreateProductComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        CarouselModule,
        EventModule,
        PrimeTemplate,
        ChatModule,
    ],
  exports:[
    ServiceCardComponent
  ]
})
export class SolutionsModule { }
