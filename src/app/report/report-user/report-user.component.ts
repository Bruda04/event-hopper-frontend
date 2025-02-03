import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrl: './report-user.component.css'
})
export class ReportUserComponent {

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<ReportUserComponent>,) {
  }
  reportForm: FormGroup = new FormGroup({
    reason: new FormControl('',Validators.required),
  })

  report() {

  }
}
