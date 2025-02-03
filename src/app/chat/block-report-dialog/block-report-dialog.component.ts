import { Component } from '@angular/core';
import {ReportUserComponent} from '../../report/report-user/report-user.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-block-report-dialog',
  templateUrl: './block-report-dialog.component.html',
  styleUrl: './block-report-dialog.component.css'
})
export class BlockReportDialogComponent {

  constructor(
               private dialog: MatDialog,
               ) {
  }

  block() {

  }

  report() {
    this.dialog.open(ReportUserComponent, {
      width: '500px',
    })
  }
}
