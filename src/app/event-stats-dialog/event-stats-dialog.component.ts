import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EventService} from '../event/event.service';

@Component({
  selector: 'app-event-stats-dialog',
  templateUrl: './event-stats-dialog.component.html',
  styleUrls: ['./event-stats-dialog.component.css']
})
export class EventStatsDialogComponent implements OnInit {
  stats: any;
  loading = true;

  constructor(
    public dialogRef: MatDialogRef<EventStatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventService.getEventStats(this.data.eventId).subscribe({
      next: (stats) => {
        this.stats = stats;
        console.log(stats)
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.stats = { error: true };
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
