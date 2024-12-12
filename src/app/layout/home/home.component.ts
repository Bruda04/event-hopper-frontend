import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../authentication/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {EventService} from '../../event/event.service';
import {ProductService} from '../../services/product.service';
import {ProductDTO} from '../../services/model/productDTO.model';
import {EventDTO} from '../../event/model/eventDTO.model';
import {MatPaginator, MatRadioButton, MatSort} from '../../infrastructure/material/material.module';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {CategoryDTO} from '../../admin-dashboard/model/categoryDTO.model';
import {CategoriesService} from '../../admin-dashboard/categories/categories.service';
import {SimpleEventTypeDTO} from '../../admin-dashboard/model/simpleEventTypeDTO.model';
import {LocationDTO} from '../../authentication/model/location/LocationDTO.model';
import {LocationService} from '../../location/location.service';
import {EventTypesService} from '../../admin-dashboard/eventTypes/event-types.service';
import {MatRadioChange} from '@angular/material/radio';
import {CheckboxChangeEvent} from 'primeng/checkbox';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrl: './home.component.css',
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
export class HomeComponent implements OnInit {
  user: any;

  constructor(private router: Router,
              private userService: UserService,
              private eventService: EventService,
              private productService : ProductService,
              private categoriesService: CategoriesService,
              private locationService: LocationService,
              private eventTypeService: EventTypesService,
              ) { }

  ngOnInit(): void {
    this.user = this.userService.getUserData();

    if (!this.user) {
      console.log('No one is logged in.');
    } else {
      console.log("Logged in is : ", this.user.role);
    }

    this.loadPagedEvents();
    this.loadPagedSolutions();
    this.loadTop5Events();
    this.loadTop5Solutions();
    this.loadLocations();
    this.loadCategories();
    this.loadEventTypes();
    this.loadFilteredEventTypes()
  }

  top5events: EventDTO[] ;
  top5solutions: ProductDTO[];
  events: EventDTO[];
  solutions: ProductDTO[];

  eventPageProperties = {
    page: 0,
    pageSize: 10,
    totalCount: 0
  };

  solutionPageProperties = {
    page: 0,
    pageSize: 10,
    totalCount: 0
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  eventSort: string = '';
  solutionSort: string = '';

  searchEventContent: string = '';
  searchSolutionContent: string = '';

  currentIndex = 0;
  showEventFilterPanel: boolean = false; // Inicijalno stanje filter panela
  showSolutionFilterPanel: boolean = false; // Inicijalno stanje filter panela

  showProducts: boolean = true;
  showServices: boolean = true;

  date: Date = null;

  locations: LocationDTO[];
  eventTypes: SimpleEventTypeDTO[];
  filteredEventTypes: SimpleEventTypeDTO[];
  categories: CategoryDTO[];

  filterEventForm: FormGroup= new FormGroup({
    location: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    date: new FormControl<Date | null>(null),
  });

  filterSolutionForm: FormGroup= new FormGroup({
    category: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number>(null, [Validators.min(0)]),
    availability: new FormControl<string>(''),
  });

  toggleEventFilterPanel(): void {
    this.showEventFilterPanel = !this.showEventFilterPanel; // Menja stanje panela
  }

  toggleSolutionFilterPanel(): void {
    this.showSolutionFilterPanel = !this.showSolutionFilterPanel; // Menja stanje panela
  }

  applyFilters(): void {
    if (this.filterSolutionForm.valid || this.filterEventForm.valid) {
      return;
    } else if (!this.filterSolutionForm.valid) {
      this.filterSolutionForm.markAsTouched();

    }else if (!this.filterEventForm.valid){
      this.filterEventForm.markAsTouched();
    }
  }

  resetFilters(): void {
    this.filterSolutionForm.patchValue({
      category: '',
      eventType: '',
      minPrice: null,
      maxPrice: null,
      availability: ''
    });

    this.filterEventForm.patchValue({
      location: '',
      eventType: '',
      date: null
    });

    this.applyFilters();
  }

  private loadTop5Events() {
    this.eventService.getTop5Events("d7b9e5c3-a6f4-49a2-b8c1-7e3f9a2d6b4f").subscribe(
      {
        next: event => {
          this.top5events = event;

        },
        error: event => {
          console.error("Error loading top 5 events");
        }
      }
    );
  }

  private loadTop5Solutions() {

    this.productService.getTop5Solutions("4b9c7f5a-d3e2-42a1-b6c8-3f7e9d5a2c6f").subscribe(
      {
        next: product => {
          this.top5solutions = product;

        },
        error: product => {
          console.error("Error loading top 5 solutions");
        }
      }
    );
  }

  eventPageChanged(pageEvent: PageEvent): void {
    this.eventPageProperties.page = pageEvent.pageIndex;
    this.eventPageProperties.pageSize = pageEvent.pageSize;
    this.loadPagedEvents();
  }

  loadPagedEvents() :void {

    const locationId = this.filterEventForm.value.location?.city || null;
    const eventTypeId = this.filterEventForm.value.eventType?.id || null;

    let pickedDate = "";
    console.log(this.date);
    if (this.date !== null && this.date !== undefined) {
      let date = this.date.getDate().toString();
      let month = this.date.getMonth().toString();
      let year = this.date.getFullYear();
      pickedDate = year+"-"+month+"-"+date+"T00:00:00";

    }

    this.eventService.getEventsPage(
      this.eventPageProperties,
      this.eventSort,
      locationId,
      eventTypeId,
      pickedDate,
      this.searchEventContent || ''
    ).subscribe(
      {
        next: (response:PagedResponse<EventDTO>) => {

          this.events = response.content;
          this.eventPageProperties.totalCount = response.totalElements;
        },
        error: solutions => {
          console.error("Error loading events");
        }
      }
    );
  }

  solutionPageChanged(pageEvent: PageEvent): void {
    this.solutionPageProperties.page = pageEvent.pageIndex;
    this.solutionPageProperties.pageSize = pageEvent.pageSize;
    this.loadPagedSolutions();
  }

  loadPagedSolutions() :void {
    const categoryId = this.filterSolutionForm.value.category?.id || null;
    const eventTypeId = this.filterSolutionForm.value.eventType?.id || null;

    this.productService.getSolutionsPage(
      this.solutionPageProperties,
      this.solutionSort,
      this.showProducts,
      this.showServices,
      categoryId,
      eventTypeId,
      this.filterSolutionForm.value.minPrice || null,
      this.filterSolutionForm.value.maxPrice || null,
      this.filterSolutionForm.value.availability === 'available'
        ? true
        : this.filterSolutionForm.value.availability === 'unavailable'
          ? false
          : null,
      this.searchSolutionContent || ''
    ).subscribe({
      next: (response:PagedResponse<ProductDTO>) => {
        console.log(this.searchSolutionContent);
        this.solutions = response.content; // Pretpostavljamo da API vraća `items`
        this.solutionPageProperties.totalCount = response.totalElements; // Ažuriramo ukupan broj stavki
      },
      error: (err) => {
        console.error('Error loading solutions', err);
      }
    });
  }

  private loadLocations() {
    this.locationService.getLocations().subscribe(
      {
        next: (locations: LocationDTO[]) => {
          this.locations = locations
        },
        error: () => {
          console.error('Error loading locations');
        }
      });
  }

  loadEventTypes(){
    // this.eventTypeService.getEventTypes().subscribe(
    //   {
    //     next:(eventTypes: EventTypeDTO[]) => {
    //       this.eventTypes = eventTypes;
    //     },
    //     error:()=>{
    //       console.error('Error loading eventTypes');
    //     }
    //   }
    // );
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

  loadFilteredEventTypes(): void {
    this.filterSolutionForm.get('category')?.valueChanges.subscribe((categoryId: any) => {
      const category: CategoryDTO = this.categories.find(cat => cat.id === categoryId);
      this.filteredEventTypes = category?.eventTypes || [];
    });
  }

  solutionRadioChange(event: MatRadioChange, data:any) {
    this.solutionSort = event.value;
  }

  eventRadioChange(event: MatRadioChange, data:any) {
    this.eventSort = event.value;
  }

  showOrHideProducts(event: CheckboxChangeEvent, data:any) {
    this.showProducts = !this.showProducts;
  }

  showOrHideServices(event: CheckboxChangeEvent, data:any) {
    this.showServices = !this.showServices;
  }

  setSearchSolutionContent(event: Event){
    this.searchSolutionContent = (event.target as HTMLInputElement).value;
  }

  setSearchEventContent(event: Event){
    this.searchEventContent = (event.target as HTMLInputElement).value;
  }

  OnDateChange(event: MatDatepickerInputEvent<any, any>){
    this.date = event.value;
  }

}
