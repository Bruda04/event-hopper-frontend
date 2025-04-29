import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsManagementComponent } from './admin-reports-management.component';

describe('AdminReportsManagementComponent', () => {
  let component: AdminReportsManagementComponent;
  let fixture: ComponentFixture<AdminReportsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReportsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
