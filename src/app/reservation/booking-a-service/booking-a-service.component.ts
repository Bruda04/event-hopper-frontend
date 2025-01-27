import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-booking-a-service',
  templateUrl: './booking-a-service.component.html',
  styleUrl: './booking-a-service.component.css'
})
export class BookingAServiceComponent {


  date: Date = null;

  bookingForm: FormGroup = new FormGroup ({
    date : new FormControl<Date|null>(null),
    startTime : new FormControl<string>(''),
  });

  freeTerms:string[] = ["11:00","12:00", "13:00"];

  OnDateChange(event: MatDatepickerInputEvent<any, any>){
    this.date = event.value;
    this.bookingForm.get('date')?.setValue(event.value);
  }
}
