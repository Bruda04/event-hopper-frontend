import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SimpleEventDTO} from '../../shared/dto/events/simpleEventDTO.model';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';

@Component({
  selector: 'app-dialog-buy-product',
  templateUrl: './dialog-buy-product.component.html',
  styleUrl: './dialog-buy-product.component.css'
})
export class DialogBuyProductComponent {
  event: SimpleEventDTO;
  solution: SolutionDetailsDTO;
  constructor(public dialogRef: MatDialogRef<DialogBuyProductComponent>,
              @Inject(MAT_DIALOG_DATA) data: {eventId: string, solution: SolutionDetailsDTO}
  ) {
    this.solution = data.solution;
    this.event = data.solution.applicableEvents.find((e: SimpleEventDTO): boolean => e.id === data.eventId);
  }

  buy(): void {
    this.dialogRef.close(true);
  }
}
