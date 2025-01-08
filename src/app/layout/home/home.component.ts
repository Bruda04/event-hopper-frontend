import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../authentication/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {EventService} from '../../event/event.service';
import {ProductService} from '../../solutions/product.service';
import {MatPaginator, MatRadioButton, MatSort} from '../../infrastructure/material/material.module';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {CategoriesService} from '../../admin-dashboard/categories/categories.service';
import {LocationService} from '../../location/location.service';
import {EventTypesService} from '../../admin-dashboard/eventTypes/event-types.service';
import {MatRadioChange, MatRadioGroup} from '@angular/material/radio';
import {CheckboxChangeEvent} from 'primeng/checkbox';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {EventDTO} from '../../shared/dto/events/eventDTO.model';
import {ProductDTO} from '../../shared/dto/solutions/productDTO.model';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {EventTypeManagementDTO} from '../../shared/dto/eventTypes/EventTypeManagementDTO.model';
import {MatSelectChange} from '@angular/material/select';

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
              private cdRef: ChangeDetectorRef

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
    this.loadCities();
    this.loadCategories();
    this.loadEventTypes();
    // this.loadFilteredEventTypes();

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
  @ViewChild('dateInput') dateInput!: ElementRef;

  cities: String[];
  eventTypes: SimpleEventTypeDTO[];
  filteredEventTypes: SimpleEventTypeDTO[];
  categories: CategoryDTO[];

  filterEventForm: FormGroup= new FormGroup({
    city: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    date: new FormControl<Date | null>(null),
  });

  filterSolutionForm: FormGroup= new FormGroup({
    category: new FormControl<string>(''),
    eventTypes: new FormControl<string[]>([]),
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

  resetFilters(): void {
    this.filterSolutionForm.patchValue({
      category: '',
      eventTypes: '',
      minPrice: null,
      maxPrice: null,
      availability: ''
    });

    this.filterEventForm.patchValue({
      city: '',
      eventType: '',
      date: null
    });

    this.date = null;
    this.filterEventForm.get('date')?.updateValueAndValidity();
    if (this.dateInput) {
      this.dateInput.nativeElement.value = '';
    }


    this.cdRef.detectChanges();

    this.loadPagedEvents();
    this.loadPagedSolutions();
  }

  private loadTop5Events() {
    this.eventService.getTop5Events().subscribe(
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

    this.productService.getTop5Solutions().subscribe(
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

    const locationId = this.filterEventForm.value?.city || null;
    const eventTypeId = this.filterEventForm.value?.eventType.id || null;

    let pickedDate = "";
    if (this.date !== null && this.date !== undefined) {
      let date = this.date.getDate().toString().padStart(2, '0'); // Dodaje vodeću nulu ako je potrebno
      let month = (this.date.getMonth() + 1).toString().padStart(2, '0'); // +1 da bi mesec bio ispravan i formatiran
      let year = this.date.getFullYear();
      pickedDate = `${year}-${month}-${date}T00:00:00`;
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
    const eventTypes = this.filterSolutionForm.value?.eventTypes || null;
    console.log(eventTypes);
    const eventTypeIds: string[] = [];
    if(eventTypes!=null){
      for(let eventType of eventTypes){
        eventTypeIds.push(eventType.id);
      }
    }

    this.productService.getSolutionsPage(
      this.solutionPageProperties,
      this.solutionSort,
      this.showProducts,
      this.showServices,
      categoryId,
      eventTypeIds,
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

  loadCities(){
    this.locationService.getCities().subscribe(
      {
        next:(cities: String[]) => {
          this.cities = cities;
        },
        error: () => {
          console.error('Error loading cities');
        }
      }
    )
  }

  loadEventTypes(){
    this.eventTypeService.getEventTypesForManagement().subscribe(
      {
        next:(eventTypes: EventTypeManagementDTO) => {
          this.eventTypes = eventTypes.eventTypes;
          console.log(this.eventTypes);
        },
        error:()=>{
          console.error('Error loading eventTypes');
        }
      }
    );
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

  loadFilteredEventTypes(event: MatSelectChange): void {
    console.log("Upaoooooooo");
    const category = event.value;
    this.filteredEventTypes = category?.eventTypes || [];
    console.log(this.filteredEventTypes);
  }

  solutionRadioChange(event: MatRadioChange, data:any) {
    this.solutionSort = event.value;
  }

  eventRadioChange(event: MatRadioChange) {
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
    this.filterEventForm.get('date')?.setValue(event.value);
  }

}
