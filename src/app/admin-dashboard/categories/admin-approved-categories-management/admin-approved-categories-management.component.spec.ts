import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovedCategoriesManagementComponent } from './admin-approved-categories-management.component';

describe('AdminApprovedCategoriesManagementComponent', () => {
  let component: AdminApprovedCategoriesManagementComponent;
  let fixture: ComponentFixture<AdminApprovedCategoriesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminApprovedCategoriesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApprovedCategoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
