import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {GetReportDTO} from '../../../shared/dto/reports/GetReportDTO.model';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ReportsService} from '../reports.service';
import {SuspendComponentComponent} from '../suspend-component/suspend-component.component';
import {DeleteReportComponent} from '../delete-report/delete-report.component';

@Component({
  selector: 'app-admin-reports-management',
  templateUrl: './admin-reports-management.component.html',
  styleUrl: './admin-reports-management.component.css'
})
export class AdminReportsManagementComponent implements OnInit {

  dataSource: MatTableDataSource<GetReportDTO>;
  displayedColumns: string[] = [
    'reporter',
    'reported',
    'reason',
    'actions',
  ]

  @Output() reportsChange:EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private reportsService: ReportsService,
              public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.load();
  }

  delete(element:GetReportDTO) {
    const dialogRef = this.dialog.open(DeleteReportComponent, {
      minWidth: '30vw',
    });

    dialogRef.afterClosed().subscribe((result : boolean | null) =>{
      if(result) {
        this.reportsService.delete(element.id).subscribe({
          next: result => {
            this.load();
            this.reportsChange.emit();
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  suspend(element:GetReportDTO) {
    const dialogRef = this.dialog.open(SuspendComponentComponent, {
      minWidth: '30vw',
    });

    dialogRef.afterClosed().subscribe((result : boolean | null) =>{
      if(result) {
        this.reportsService.suspend(element.id).subscribe({
          next: result => {
            this.load();
            this.reportsChange.emit();
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  load():void{
    this.reportsService.getReports().subscribe({
      next: (reports: GetReportDTO[]) => {
        this.dataSource = new MatTableDataSource<GetReportDTO>(reports);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
