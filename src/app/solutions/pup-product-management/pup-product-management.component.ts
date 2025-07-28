import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ServiceManagementDTO} from '../../shared/dto/solutions/serviceManagementDTO.model';
import {MatTableDataSource} from '@angular/material/table';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {MatDialog, MatPaginator, MatSort} from '../../infrastructure/material/material.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../admin-dashboard/categories/categories.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {CreatedCategorySuggestionDTO} from '../../shared/dto/categories/createdCategorySuggestionDTO.model';
import {EditServiceComponent} from '../edit-service/edit-service.component';
import {UpdateServiceDTO} from '../../shared/dto/solutions/updateServiceDTO.model';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {ProductService} from '../product.service';
import {ProductForManagementDTO} from '../../shared/dto/solutions/productForManagementDTO.model';
import {CreateProductComponent} from '../create-product/create-product.component';
import {CreateProductDTO} from '../../shared/dto/solutions/createProductDTO.model';
import {EditProductComponent} from '../edit-product/edit-product.component';
import {UpdateProductDTO} from '../../shared/dto/solutions/updateProductDTO.model';

@Component({
  selector: 'app-pup-product-management',
  templateUrl: './pup-product-management.component.html',
  styleUrl: './pup-product-management.component.css',
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
export class PupProductManagementComponent  implements OnInit, AfterViewInit {
  products: ProductForManagementDTO[];
  dataSource: MatTableDataSource<ProductForManagementDTO>;

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
    'eventTypes',
    'status',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() productChanged: EventEmitter<void> = new EventEmitter<void>();

  showFilterPanel: boolean = false;

  filterForm: FormGroup= new FormGroup({
    category: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number>(null, [Validators.min(0)]),
    availability: new FormControl<string>(''),
  });

  searchContent: string = '';



  constructor(private productService: ProductService,
              private categoriesService: CategoriesService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
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
    const dialogRef: MatDialogRef<CreateProductComponent> = this.dialog.open(CreateProductComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
      data: this.categories || []
    });

    dialogRef.afterClosed().subscribe((newProduct: CreateProductDTO | null) => {
      if (newProduct) {
        if (this.categories.find(c => c.id === newProduct.categoryId)) {
          this.productService.add(newProduct).subscribe(
            {
              next: () => {
                this.loadPagedEntities();
                this.productChanged.emit();
              },
              error: (err) => {
                console.error('Error adding product');
                if (err.error?.message) {
                  this.showErrorToast("Error creating product: " + err.error.message);
                }
              }
            });
        } else {
          this.categoriesService.makeSuggestion(newProduct.categoryId).subscribe({
            next: (categorySuggestion: CreatedCategorySuggestionDTO) => {
              newProduct.categoryId = categorySuggestion.id;
              this.productService.add(newProduct).subscribe(
                {
                  next: () => {
                    this.loadPagedEntities();
                    this.productChanged.emit();
                  },
                  error: (err) => {
                    console.error('Error adding product with suggested category');
                    if (err.error?.message) {
                      this.showErrorToast("Error creating product: " + err.error.message);
                    }
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
    this.productService.remove(id).subscribe(
      {
        next: () => {
          this.loadPagedEntities()
          this.productChanged.emit();
        },
        error: (err) => {
          console.error('Error removing product');
          if (err.error?.message) {
            this.showErrorToast("Error removing product: " + err.error.message);
          }
        }
      }
    );
  }

  edit(element: ProductForManagementDTO):void {
    const dialogRef: MatDialogRef<EditProductComponent> = this.dialog.open(EditProductComponent, {
      minWidth: '70vw',
      minHeight: '70vh',
      data: {productToEdit: element,
        eventTypes: this.categories.filter(c => element.category.id === c.id)[0]?.eventTypes.filter(et => !et.deactivated) || null}
    });

    dialogRef.afterClosed().subscribe((updateProduct: UpdateProductDTO | null) => {
      if(updateProduct) {
        this.productService.update(element.id, updateProduct).subscribe(
          {
            next: () => {
              this.loadPagedEntities();
              this.productChanged.emit();
            },
            error: (err: { error?: { message?: string } }) => {
              console.error('Error updating product');
              if (err.error?.message) {
                this.showErrorToast("Error updating product: " + err.error.message);
              }
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
        error: (err) => {
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


    this.productService.getAllForManagement(
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
        next: (response: PagedResponse<ProductForManagementDTO>) => {
          this.dataSource = new MatTableDataSource(response.content);
          this.pageProperties.totalCount = response.totalElements;
        },
        error: (e) => {
          console.error('Error loading products', e);
          if (e.error?.message) {
            this.showErrorToast("Error loading services: " + e.error.message);
          }
        }
      });
  }

  loadEventTypes(): void {
    this.filterForm.get('category')?.valueChanges.subscribe((categoryId: string) => {
      const category: CategoryDTO = this.categories.find(cat => cat.id === categoryId);
      this.filteredEventTypes = category?.eventTypes.filter(eventType => !eventType.deactivated) || [];
  });
  }

  private showErrorToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  goToProduct(element: ServiceManagementDTO): void {
    window.open(`/solutions/${element.id}`, '_blank');
  }
}
