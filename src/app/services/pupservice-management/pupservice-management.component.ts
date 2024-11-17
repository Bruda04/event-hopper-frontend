import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Service} from '../model/service.model';
import {MatTableDataSource} from '@angular/material/table';
import {ServicesService} from '../services.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

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

  constructor(private serviceService: ServicesService) {
  }

  ngOnInit(): void {
    this.services = this.serviceService.getAll();
    this.dataSource = new MatTableDataSource(this.services);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  remove(service: Service) {
    this.serviceService.remove(service);
    this.services = this.serviceService.getAll();
    this.dataSource.data = this.services;
  }
}
