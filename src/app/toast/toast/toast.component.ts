import {ToastService} from '../toast.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast" *ngIf="show">
      {{ message }}
    </div>
  `,
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  show = false;
  message = '';

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(msg => {
      this.message = msg;
      this.show = true;
      setTimeout(() => this.show = false, 7000);
    });
  }
}
