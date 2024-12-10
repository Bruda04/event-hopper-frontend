import {AfterViewInit, Component, createComponent, OnInit, ViewChild} from '@angular/core';
import {Service} from '../model/service.model';
import {MatTableDataSource} from '@angular/material/table';
import {ServicesService} from '../services.service';
import {CreateServiceComponent} from '../create-service/create-service.component';
import {MatPaginator, MatSort, MatDialog} from '../../infrastructure/material/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {EditServiceComponent} from '../edit-service/edit-service.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {ServiceManagementDTO} from '../model/serviceManagementDTO.model';
import {CreateServiceDTO} from '../model/createServiceDTO.model';
import {SimpleCategoryDTO} from '../../admin-dashboard/model/simpleCategoryDTO.model';
import {SimpleEventTypeDTO} from '../../admin-dashboard/model/simpleEventTypeDTO.model';
import {CategoriesService} from '../../admin-dashboard/categories/categories.service';
import {EventTypesService} from '../../admin-dashboard/eventTypes/event-types.service';
import {CategoryDTO} from '../../admin-dashboard/model/categoryDTO.model';
import {UpdateServiceDTO} from '../model/updateServiceDTO.model';


@Component({
  selector: 'app-pupservice-management',
  templateUrl: './pupservice-management.component.html',
  styleUrl: './pupservice-management.component.css',
  animations: [
    trigger('slideInOut', [
      state('void', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class PUPServiceManagementComponent implements OnInit {
  services: ServiceManagementDTO[];
  dataSource: MatTableDataSource<ServiceManagementDTO>;

  categories: CategoryDTO[];
  filteredEventTypes: SimpleEventTypeDTO[] = [];

  pageProperties = {
    page: 0,
    pageSize: 4,
    totalCount: 0,
    pageSizeOptions: [4, 8, 12]
  };
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

  filterForm: FormGroup= new FormGroup({
    category: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number>(null, [Validators.min(0)]),
    availability: new FormControl<string>(''),
  });



  constructor(private serviceService: ServicesService,
              private categorisService: CategoriesService,
              private eventTypesService: EventTypesService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPagedEntities();

    this.loadCategories();

    this.loadEventTypes();
  }


  add(): void {
    const dialogRef: MatDialogRef<CreateServiceComponent> = this.dialog.open(CreateServiceComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
      data: this.categories || []
    });

    dialogRef.afterClosed().subscribe((newService: CreateServiceDTO | null) => {
      if (newService) {
        this.serviceService.add(newService).subscribe(
          {
            next: () => {
              this.loadPagedEntities();
            },
            error: () => {
              console.error('Error adding service');
            }
          }
        )
      }
    });
  }

  remove(id: string): void {
    this.serviceService.remove(id).subscribe(
      {
        next: () => {
          this.loadPagedEntities()
        },
        error: () => {
          console.error('Error removing service');
        }
      }
    );
  }

  edit(element: ServiceManagementDTO):void {
    console.log("cat",this.categories)
    const dialogRef: MatDialogRef<EditServiceComponent> = this.dialog.open(EditServiceComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
      data: {serviceToEdit: element,
        eventTypes: this.categories.filter(c => element.category.id === c.id)[0]?.eventTypes || null}
    });

    dialogRef.afterClosed().subscribe((updatedService: UpdateServiceDTO | null) => {
      if(updatedService) {
        this.serviceService.update(element.id, updatedService).subscribe(
          {
            next: () => {
              this.loadPagedEntities();
            },
            error: () => {
              console.error('Error updating service');
            }
          }
        );
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
      this.loadPagedEntities();
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
    this.applyFilters();
  }

  loadCategories() {
    this.categorisService.getApproved().subscribe(
      {
        next: (categories: CategoryDTO[]) => {
          this.categories = categories;
        },
        error: () => {
          console.error('Error loading categories');
        }
      });
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageProperties.page = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.loadPagedEntities();
  }

  loadPagedEntities() {
    this.serviceService.getAllForManagement(this.pageProperties)
      .subscribe( {
        next: (response: PagedResponse<ServiceManagementDTO>) => {
          this.dataSource = new MatTableDataSource(response.content);
          this.pageProperties.totalCount = response.totalElements;
          console.log(response);
        },
        error: () => {
          console.error('Error loading services');
        }
      });
  }

  loadEventTypes() {
    this.filterForm.get('category')?.valueChanges.subscribe((categoryId: any) => {
      const category: CategoryDTO = this.categories.find(cat => cat.id === categoryId);
      this.filteredEventTypes = category?.eventTypes || [];
    });
  }
}
