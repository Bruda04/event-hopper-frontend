import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ServicesService} from '../services.service';
import {CreateServiceComponent} from '../create-service/create-service.component';
import {MatDialog, MatPaginator, MatSort} from '../../infrastructure/material/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {EditServiceComponent} from '../edit-service/edit-service.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {ServiceManagementDTO} from '../../shared/dto/solutions/serviceManagementDTO.model';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {CategoriesService} from '../../admin-dashboard/categories/categories.service';
import {CreateServiceDTO} from '../../shared/dto/solutions/createServiceDTO.model';
import {CreatedCategorySuggestionDTO} from '../../shared/dto/categories/createdCategorySuggestionDTO.model';
import {UpdateServiceDTO} from '../../shared/dto/solutions/updateServiceDTO.model';

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
export class PUPServiceManagementComponent implements OnInit, AfterViewInit {
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
  @Output() serviceChanged: EventEmitter<void> = new EventEmitter<void>();

  showFilterPanel: boolean = false;

  filterForm: FormGroup= new FormGroup({
    category: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number>(null, [Validators.min(0)]),
    availability: new FormControl<string>(''),
  });

  searchContent: string = '';



  constructor(private serviceService: ServicesService,
              private categoriesService: CategoriesService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPagedEntities();

    this.loadCategories();

    this.loadEventTypes();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.loadPagedEntities();
    });
  }


  add(): void {
    const dialogRef: MatDialogRef<CreateServiceComponent> = this.dialog.open(CreateServiceComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
      data: this.categories || []
    });

    dialogRef.afterClosed().subscribe((newService: CreateServiceDTO | null) => {
      if (newService) {
        if (this.categories.find(c => c.id === newService.categoryId)) {
          this.serviceService.add(newService).subscribe(
            {
              next: () => {
                this.loadPagedEntities();
                this.serviceChanged.emit();
              },
              error: () => {
                console.error('Error adding service');
              }
            });
        } else {
          this.categoriesService.makeSuggestion(newService.categoryId).subscribe({
            next: (categorySuggestion: CreatedCategorySuggestionDTO) => {
              newService.categoryId = categorySuggestion.id;
              this.serviceService.add(newService).subscribe(
                {
                  next: () => {
                    this.loadPagedEntities();
                    this.serviceChanged.emit();
                  },
                  error: () => {
                    console.error('Error adding service with suggested category');
                  }
                }
              )
            }
          });
        }
      }
    });
  }

  remove(id: string): void {
    this.serviceService.remove(id).subscribe(
      {
        next: () => {
          this.loadPagedEntities()
          this.serviceChanged.emit();
        },
        error: () => {
          console.error('Error removing service');
        }
      }
    );
  }

  edit(element: ServiceManagementDTO):void {
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
              this.serviceChanged.emit();
            },
            error: () => {
              console.error('Error updating service');
            }
          }
        );
      }
    });
  }

  // when typed in search bar set the search content
  setSearchContent(event: Event): void {
    this.searchContent = (event.target as HTMLInputElement).value;
    if (!this.searchContent) {
      this.loadPagedEntities();
    }
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

  loadCategories(): void {
    this.categoriesService.getApproved().subscribe(
      {
        next: (categories: CategoryDTO[]) => {
          this.categories = categories;
        },
        error: () => {
          console.error('Error loading categories');
        }
      });
  }

  pageChanged(pageEvent: PageEvent): void {
    this.pageProperties.page = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.loadPagedEntities();
  }

  loadPagedEntities(): void {
    const sortField = this.sort?.active || ''; // Column to sort by
    const sortDirection = this.sort?.direction || ''; // 'asc' or 'desc'


    this.serviceService.getAllForManagement(
      this.pageProperties,
      this.filterForm.value.category,
      this.filterForm.value.eventType,
      this.filterForm.value.minPrice,
      this.filterForm.value.maxPrice,
      this.filterForm.value.availability === 'available' ? true : this.filterForm.value.availability === 'unavailable' ? false : null,
      this.searchContent,
      sortField,
      sortDirection
    )
      .subscribe( {
        next: (response: PagedResponse<ServiceManagementDTO>) => {
          this.dataSource = new MatTableDataSource(response.content);
          this.pageProperties.totalCount = response.totalElements;
        },
        error: (e) => {
          console.error('Error loading services', e);
        }
      });
  }

  loadEventTypes(): void {
    this.filterForm.get('category')?.valueChanges.subscribe((categoryId: any) => {
      const category: CategoryDTO = this.categories.find(cat => cat.id === categoryId);
      this.filteredEventTypes = category?.eventTypes || [];
    });
  }
}
