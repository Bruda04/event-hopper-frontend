import {AfterViewInit, Component, createComponent, OnInit, ViewChild} from '@angular/core';
import {Service} from '../model/service.model';
import {MatTableDataSource} from '@angular/material/table';
import {ServicesService} from '../services.service';
import {CreateServiceComponent} from '../create-service/create-service.component';
import {MatPaginator, MatSort, MatDialog} from '../../infrastructure/material/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {EditServiceComponent} from '../edit-service/edit-service.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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

  showFilterPanel: boolean = false;
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  eventTypes: string[] = ['Event Type 1', 'Event Type 2', 'Event Type 3', 'Event Type 4'];
  filterForm: FormGroup= new FormGroup({
    category: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number>(null, [Validators.min(0)]),
    availability: new FormControl<string>(''),
  });



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

    this.dataSource.filterPredicate = (data: Service, filter: string): boolean => {
      const filterText: string = filter.trim().toLowerCase();
      return data.name.toLowerCase().includes(filterText) ||
        data.description.toLowerCase().includes(filterText) ||
        data.category.toLowerCase().includes(filterText);
    };
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

  edit(element: Service):void {
    const dialogRef: MatDialogRef<EditServiceComponent> = this.dialog.open(EditServiceComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
      data: element
    });

    dialogRef.afterClosed().subscribe((updatedService: Service | null) => {
      if(updatedService) {
        this.serviceService.update(updatedService);
        console.log(updatedService);
        this.services = this.serviceService.getAll();
        this.dataSource.data = this.services;
      }
    });
  }

  applySearch(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  showFilters():void {
    this.showFilterPanel = !this.showFilterPanel;
  }

  applyFilters(): void {
    if (this.filterForm.valid) {
      return;
    } else {
      this.filterForm.markAsTouched();
    }
  }

  resetFilters(): void {
    this.filterForm.patchValue({
      category: '',
      eventType: '',
      minPrice: null,
      maxPrice: null,
      availability: ''
    });
  }
}
