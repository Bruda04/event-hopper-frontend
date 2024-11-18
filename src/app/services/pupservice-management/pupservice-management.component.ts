import {AfterViewInit, Component, createComponent, OnInit, ViewChild} from '@angular/core';
import {Service} from '../model/service.model';
import {MatTableDataSource} from '@angular/material/table';
import {ServicesService} from '../services.service';
import {CreateServiceComponent} from '../create-service/create-service.component';
import {MatPaginator, MatSort, MatDialog} from '../../infrastructure/material/material.module';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-pupservice-management',
  templateUrl: './pupservice-management.component.html',
  styleUrl: './pupservice-management.component.css'
})
export class PUPServiceManagementComponent implements OnInit, AfterViewInit {
  services: Service[];
  dataSource: MatTableDataSource<Service>;

  displayedColumns: string[] = [
    'product',
    'description',
    'basePrice',
    'discount',
    'finalPrice',
    'visible',
    'available',
    'duration',
    'cancellationWindow',
    'reservationWindow',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private serviceService: ServicesService, public dialog: MatDialog) {
  }

  openModal(): void {
    const dialogRef: MatDialogRef<CreateServiceComponent> = this.dialog.open(CreateServiceComponent, {
      minWidth: '70vw',
      minHeight: '70vh'
    });

    dialogRef.afterClosed().subscribe((newService: Service | null) => {
    if (newService) {
      this.serviceService.add(newService);
      this.services = this.serviceService.getAll();
      this.dataSource.data = this.services;
    }
  });
  }


  ngOnInit(): void {
    this.services = this.serviceService.getAll();
    this.dataSource = new MatTableDataSource(this.services);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  remove(service: Service): void {
    this.serviceService.remove(service);
    this.services = this.serviceService.getAll();
    this.dataSource.data = this.services;
  }
}
