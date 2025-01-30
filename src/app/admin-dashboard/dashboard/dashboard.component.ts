import {Component, ViewChild} from '@angular/core';
import {
  AdminApprovedCategoriesManagementComponent
} from '../categories/admin-approved-categories-management/admin-approved-categories-management.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('approvedCategories') approvedCategories: AdminApprovedCategoriesManagementComponent;

  refreshApprovedCategories() {
    this.approvedCategories.load();
  }

}
