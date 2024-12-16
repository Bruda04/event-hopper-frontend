import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceManagementDTO} from '../../shared/dto/solutions/serviceManagementDTO.model';
import {MatTableDataSource} from '@angular/material/table';
import {PriceManagementDTO} from '../../shared/dto/prices/PriceManagementDTO.model';
import {MatDialog, MatPaginator, MatSort} from '../../infrastructure/material/material.module';
import {ServicesService} from '../services.service';
import {CategoriesService} from '../../admin-dashboard/categories/categories.service';
import {ProductService} from '../product.service';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {MatDialogRef} from '@angular/material/dialog';
import {EditServiceComponent} from '../edit-service/edit-service.component';
import {UpdateServiceDTO} from '../../shared/dto/solutions/updateServiceDTO.model';

@Component({
  selector: 'app-price-list-management',
  templateUrl: './price-list-management.component.html',
  styleUrl: './price-list-management.component.css'
})
export class PriceListManagementComponent implements OnInit {
  prices: PriceManagementDTO[];
  dataSource: MatTableDataSource<PriceManagementDTO>;

  displayedColumns: string[] = [
    'product',
    'basePrice',
    'discount',
    'finalPrice',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPrices();
  }


  loadPrices(): void {
    this.productService.getPricesForManagement().subscribe(
      {
        next: (response: PriceManagementDTO[]) => {
          this.prices = response;
          this.dataSource = new MatTableDataSource(this.prices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.error('Error loading prices');
        }
      }
    );
  }

  edit(element: ServiceManagementDTO):void {
    const dialogRef: MatDialogRef<EditServiceComponent> = this.dialog.open(EditServiceComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
      data: element
    });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

  export(): void {

  }
}
