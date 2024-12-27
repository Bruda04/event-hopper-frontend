import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSort } from "../../../infrastructure/material/material.module";
import { EventTypesService } from '../event-types.service';
import { EditEventTypeComponent } from '../edit-event-type/edit-event-type.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateEventTypeComponent } from '../create-event-type/create-event-type.component';
import {EventType} from '../../../shared/model/eventType.model';
import {SimpleEventTypeDTO} from '../../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {SimpleCategoryDTO} from '../../../shared/dto/categories/simpleCategoryDTO.model';
import {EventTypeManagementDTO} from '../../../shared/dto/eventTypes/EventTypeManagementDTO.model';
import {CreateEventTypeDTO} from '../../../shared/dto/eventTypes/CreateEventTypeDTO.model';
import {UpdateEventTypeDTO} from '../../../shared/dto/eventTypes/UpdateEventTypeDTO.model';
import {join} from '@angular/compiler-cli';

@Component({
  selector: 'app-admin-event-types-management',
  templateUrl: './admin-event-types-management.component.html',
  styleUrls: ['./admin-event-types-management.component.css']
})
export class AdminEventTypesManagementComponent implements OnInit, AfterViewInit {
  eventTypes: SimpleEventTypeDTO[];
  categories: SimpleCategoryDTO[];
  dataSource: MatTableDataSource<SimpleEventTypeDTO>;

  displayedColumns: string[] = ['name', 'description', 'active', 'suggestedCategories', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventTypesService: EventTypesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEventTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;  // Apply sorting to the table after the view is initialized
  }

  private loadEventTypes(): void {
    this.eventTypesService.getEventTypesForManagement().subscribe({
      next: (eventTypesForManagement: EventTypeManagementDTO) => {
        this.eventTypes = eventTypesForManagement.eventTypes;
        this.categories = eventTypesForManagement.allCategories;
        this.dataSource = new MatTableDataSource(this.eventTypes);
      },
      error: (_) => {
        console.error("Error loading categories");
      }
    });


  }

  getCategoryNames(categories: SimpleCategoryDTO[]): string {
    return categories?.map(category => category.name).join(', ') || 'No Categories';
  }


  create(): void {
    const dialogRef: MatDialogRef<CreateEventTypeComponent> = this.dialog.open(CreateEventTypeComponent, {
      minWidth: '30vw',
      minHeight: '40vh'
    });

    dialogRef.afterClosed().subscribe((newEventType: EventType | null) => {
      if (newEventType) {
        const createEventTypeDTO: CreateEventTypeDTO = {
          name: newEventType.name,
          description: newEventType.description,
          suggestedCategories: []
        };

        this.eventTypesService.add(createEventTypeDTO).subscribe({
          next: () => {
            this.loadEventTypes();
          },
          error: (_) => {
            console.error("Error loading categories");
          }
        });
      }
    });
  }

  edit(eventType: EventType): void {
    const dialogRef = this.dialog.open(EditEventTypeComponent, {
      minWidth: '30vw',
      data: eventType,
    });

    dialogRef.afterClosed().subscribe((result: EventType | null) => {
      if (result) {
        const updateEventTypeDTO : UpdateEventTypeDTO = {
          description: result.description,
          suggestedCategories: []
        };
        this.eventTypesService.update(result.id, updateEventTypeDTO).subscribe({
          next: () => {
            this.loadEventTypes();
          },
          error: (_) => {
            console.error("Error loading categories");
          }
        });
      }
    });
  }

  remove(eventType: EventType): void {

    this.eventTypesService.remove(eventType.id).subscribe({
      next: () => {
        this.loadEventTypes();
      },
      error: (_) => {
        console.error("Error loading categories");
      }
    });
  }
}
