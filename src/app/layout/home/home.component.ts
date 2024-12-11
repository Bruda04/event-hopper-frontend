import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../authentication/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {EventService} from '../../event/event.service';
import {ProductService} from '../../services/product.service';
import {ProductDTO} from '../../services/model/productDTO.model';
import {EventDTO} from '../../event/model/eventDTO.model';
import {MatPaginator, MatSort} from '../../infrastructure/material/material.module';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';


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

  constructor(private router: Router, private userService: UserService, private eventService: EventService, private productService : ProductService) { }

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
    //this.loadEvents();
    //this.loadSolutions();
  }


  top5events: EventDTO[] ;
  top5solutions: ProductDTO[];
  events: EventDTO[];
  solutions: ProductDTO[];

  pageProperties = {
    page: 0,
    pageSize: 10,
    totalCount: 0
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchContent: string = '';

  currentIndex = 0;
  showEventFilterPanel: boolean = false; // Inicijalno stanje filter panela
  showSolutionFilterPanel: boolean = false; // Inicijalno stanje filter panela

  locations: string[] = ['Novi Sad', 'Belgrade', 'Budapest', 'New York'];
  eventTypes: string[] = ['Wedding', 'Birthday', 'Concert'];
  categories: string[] = ['Catering','Decoration', 'Music'];

  filterEventForm: FormGroup= new FormGroup({
    location: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    date: new FormControl<Date | null>(null),

  });

  filterSolutionForm: FormGroup= new FormGroup({
    isProduct: new FormControl<string>(''),
    isService: new FormControl<string>(''),
    category: new FormControl<string>(''),
    eventType: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number>(null, [Validators.min(0)]),
    availability: new FormControl<string>(''),
  });


  get transformStyle(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  moveSlide(direction: number): void {
    const totalSlides = this.events.length;
    this.currentIndex += direction;

    if (this.currentIndex < 0) {
      this.currentIndex = totalSlides - 1;
    } else if (this.currentIndex >= totalSlides) {
      this.currentIndex = 0;
    }
  }


  toggleEventFilterPanel(): void {
    this.showEventFilterPanel = !this.showEventFilterPanel; // Menja stanje panela
  }

  toggleSolutionFilterPanel(): void {
    this.showSolutionFilterPanel = !this.showSolutionFilterPanel; // Menja stanje panela
  }

  // setSearchContent(event: Event): void {
  //   this.searchContent = (event.target as HTMLInputElement).value;
  //   if (!this.searchContent) {
  //     this.loadPagedEvents();
  //   }
  // }


  //proveriti da li radi

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


  private loadEvents() {
    this.eventService.getEvents().subscribe(
      {
        next: event => {
          this.events = event;

        },
        error: event => {
          console.error("Error loading events");
        }
      }
    );
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

    this.productService.getTop5Solutions("d7b9e5c3-a6f4-49a2-b8c1-7e3f9a2d6b4f").subscribe(
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

  private loadSolutions() {
    this.productService.getSolutions().subscribe(
      {
        next: solutions => {
          this.solutions = solutions;
        },
        error: solutions => {
          console.error("Error loading solutions");
        }
      }
    );
  }

  eventPageChanged(pageEvent: PageEvent): void {
    this.pageProperties.page = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.loadPagedEvents();
  }

  loadPagedEvents() :void {
    const sortField = this.sort?.active || ''; // Column to sort by
    const sortDirection = this.sort?.direction || ''; // 'asc' or 'desc'


    this.eventService.getEventsPage(
      this.pageProperties,
      sortField,
      sortDirection,
      this.filterEventForm.value.location,
      this.filterEventForm.value.eventType,
      this.filterEventForm.value.date,
      this.searchContent
    )

    this.eventService.getEvents().subscribe(
      {
        next: events => {
          this.events = events;
        },
        error: solutions => {
          console.error("Error loading events");
        }
      }
    );

  }

  solutionPageChanged(pageEvent: PageEvent): void {
    this.pageProperties.page = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.loadPagedSolutions();
  }

  loadPagedSolutions() :void {
    const sortField = this.sort?.active || ''; // Column to sort by
    const sortDirection = this.sort?.direction || ''; // 'asc' or 'desc'

    this.productService.getSolutionsPage(
      this.pageProperties,
      sortField,
      sortDirection,
      this.filterSolutionForm.value.isProduct || null,
      this.filterSolutionForm.value.isService || null,
      this.filterSolutionForm.value.category || null,
      this.filterSolutionForm.value.eventType || null,
      this.filterSolutionForm.value.minPrice || null,
      this.filterSolutionForm.value.maxPrice || null,
      this.filterSolutionForm.value.availability === 'available'
        ? true
        : this.filterSolutionForm.value.availability === 'unavailable'
          ? false
          : null,
      this.searchContent || ''
    ).subscribe({
      next: (response:PagedResponse<ProductDTO>) => {
        this.solutions = response.content; // Pretpostavljamo da API vraća `items`
        this.pageProperties.totalCount = response.totalElements; // Ažuriramo ukupan broj stavki
      },
      error: (err) => {
        console.error('Error loading solutions', err);
      }
    });

    // this.productService.getSolutionsPage(
    //   this.pageProperties,
    //   sortField,
    //   sortDirection,
    //   this.filterSolutionForm.value.isProduct,
    //   this.filterSolutionForm.value.isService,
    //   this.filterSolutionForm.value.category,
    //   this.filterSolutionForm.value.eventType,
    //   this.filterSolutionForm.value.minPrice,
    //   this.filterSolutionForm.value.maxPrice,
    //   this.filterSolutionForm.value.availability === 'available' ? true : this.filterSolutionForm.value.availability === 'unavailable' ? false : null,
    //   this.searchContent
    // )
    //
    // this.productService.getSolutions().subscribe(
    //   {
    //     next: solutions => {
    //       this.solutions = solutions;
    //     },
    //     error: solutions => {
    //       console.error("Error loading solutions");
    //     }
    //   }
    // );

  }
}
