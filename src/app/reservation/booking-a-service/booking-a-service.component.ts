import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';
import {SimpleEventDTO} from '../../shared/dto/events/simpleEventDTO.model';


@Component({
  selector: 'app-booking-a-service',
  templateUrl: './booking-a-service.component.html',
  styleUrl: './booking-a-service.component.css'
})
export class BookingAServiceComponent {

  event: SimpleEventDTO;
  solution: SolutionDetailsDTO;

  selectedDate: Date = null;      //choosen date

  eventDate: Date = null;

  freeTerms:string[] = ["11:00","12:00", "13:00"];

  constructor(public dialogRef: MatDialogRef<BookingAServiceComponent>,
              @Inject(MAT_DIALOG_DATA) data: {eventId: string, solution: SolutionDetailsDTO}
  ) {
    this.solution = data.solution;
    this.event = data.solution.applicableEvents.find((e: SimpleEventDTO): boolean => e.id === data.eventId);
    this.eventDate = new Date(this.event.time);
  }

  bookingForm: FormGroup = new FormGroup ({
    date : new FormControl<Date|null>(null),
    startTime : new FormControl<string>(''),

  });

  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minReservationDate = new Date();
    minReservationDate.setDate(today.getDate() + this.solution.reservationWindowDays);


    const eventDate = new Date(this.event.time);
    eventDate.setHours(0, 0, 0, 0);

    const minEventWindow = new Date(eventDate);
    minEventWindow.setDate(eventDate.getDate() - 3); // 3 dana pre eventa

    const maxEventWindow = new Date(eventDate);
    maxEventWindow.setDate(eventDate.getDate() + 2); // 2 dana posle eventa

    console.log(`Checking date: ${d}`);
    console.log('Today: ' + today);
    console.log('Event date: ', eventDate);
    console.log('Min Reservation: ', minReservationDate);
    console.log('Min event Window: ', minEventWindow);
    console.log('Max event Window: ', maxEventWindow);


    // 1. dates from the past can not be selected
    if (d < today) {
      return false;
    }

    // 2. dates in next {reservationWindowDays} can not be selected
    if (d < minReservationDate) {
      return false;
    }

    // 3. service can be booked only max 3 days before event and max 2 days after event
    if (d < minEventWindow || d > maxEventWindow) {
      return false;
    }

    return true;
  };

  dateClass = (d: Date): string => {
    const eventDate = new Date(this.event.time);
    eventDate.setHours(0, 0, 0, 0); // Resetujemo sate za tačno poređenje

    return d.getTime() === eventDate.getTime() ? 'event-date' : '';
  };


  OnDateChange(event: MatDatepickerInputEvent<any, any>){
    this.selectedDate = event.value;
    this.bookingForm.get('date')?.setValue(event.value);
  }

  book() {
    this.dialogRef.close(true);
  }
}
