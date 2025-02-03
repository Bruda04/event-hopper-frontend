import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../budget.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../authentication/services/user.service';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrl: './budget-management.component.css'
})
export class BudgetManagementComponent implements OnInit {
  constructor(private budgetService: BudgetService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  eventId: string;

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    if (this.userService.getUserData().role !== 'EVENT_ORGANIZER') {
      this.router.navigate(['/']);
    }
    this.loadBudget()
  }

  private loadBudget() {
    this.budgetService.getManagement(this.eventId).subscribe({
      next: (budget) => {
        console.log(budget);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
