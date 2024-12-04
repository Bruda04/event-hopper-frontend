import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSort } from "../../../infrastructure/material/material.module";
import { EventType } from '../../model/eventType.model';
import { EventTypesService } from '../event-types.service';
import { EditEventTypeComponent } from '../edit-event-type/edit-event-type.component';

@Component({
  selector: 'app-admin-event-types-management',
  templateUrl: './admin-event-types-management.component.html',
  styleUrls: ['./admin-event-types-management.component.css']
})
export class AdminEventTypesManagementComponent implements OnInit, AfterViewInit {
  eventTypes: EventType[];
  dataSource: MatTableDataSource<EventType>;

  displayedColumns: string[] = ['eventName', 'description', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventTypesService: EventTypesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEventTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  private loadEventTypes(): void {
    this.eventTypes = this.eventTypesService.getEventTypes();
    this.dataSource = new MatTableDataSource(this.eventTypes);
  }

  edit(eventType: EventType): void {
    const dialogRef = this.dialog.open(EditEventTypeComponent, {
      minWidth: '30vw',
      data: eventType,
    });

    dialogRef.afterClosed().subscribe((result: EventType | null) => {
      if (result) {
        this.eventTypesService.update(result);
        this.loadEventTypes();
      }
    });
  }

  remove(eventType: EventType): void {
    this.eventTypesService.remove(eventType);
    this.loadEventTypes();
  }
}
