import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateReportDTO} from '../../shared/dto/reports/CreateReportDTO.model';
import {ProfileService} from '../../profile/profile.service';
import {ReportsService} from '../../admin-dashboard/reports/reports.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrl: './report-user.component.css'
})
export class ReportUserComponent {

  reportForm: FormGroup;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<ReportUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { recipient: string },
              private formBuilder: FormBuilder,
              public profileService: ProfileService,
              public reportService: ReportsService) {

    this.reportForm = this.formBuilder.group({
      reason: new FormControl('',Validators.required),
    });
  }

  report() {


    if(this.reportForm.valid) {

        this.profileService.getProfileByEmail(this.data.recipient).subscribe({
            next: reported => {
              const report: CreateReportDTO = {
                reason: this.reportForm.value.reason,
                reported: reported.id,
              };

              this.reportService.create(report).subscribe({
                next: (_) => {
                  console.log('Creating new report', reported);
                },
                error: (_) => {
                  console.error('Error in creating report', _);
                }
              })
            },
            error: err => {
              console.log(err);
            }
          });

      this.dialogRef.close();

    }else{
      this.reportForm.markAllAsTouched();
    }
  }
}
