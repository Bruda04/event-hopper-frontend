import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BlockingService} from '../blocking.service';
import {CreateBlockDTO} from '../../shared/dto/blockings/CreateBlockDTO';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrl: './block-user.component.css'
})
export class BlockUserComponent {

  constructor(public dialogRef: MatDialogRef<BlockUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { recipient: string },
              public profileService: ProfileService,
              public blockingService: BlockingService) {
  }

  onBlock(): void {
    this.dialogRef.close();

    this.profileService.getProfileByEmail(this.data.recipient).subscribe({
      next: (blocked) => {
        const blockDto: CreateBlockDTO = {
          blocked: blocked.id
        };

        this.blockingService.create(blockDto).subscribe({
          next: (_) => {
            console.log('Creating new block');
          },
          error: (_) => {
            console.error('Error in creating block', _);
          }
        });

      },
      error: (error) => {
        console.log(error);
      }

    });

  }
}
