import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUserComponent } from './block-user/block-user.component';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose} from '@angular/material/dialog';



@NgModule({
  declarations: [
    BlockUserComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ]
})
export class BlockingModule { }
