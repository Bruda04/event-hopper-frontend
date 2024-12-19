import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-congradulation',
  templateUrl: './congradulation.component.html',
  styleUrl: './congradulation.component.css'
})
export class CongradulationComponent {

  constructor(private dialogRef: MatDialogRef<CongradulationComponent>) {
  }

  onOk(): void {
    //log out
  }
}
