import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventTypesManagementComponent } from './admin-event-types-management.component';

describe('AdminEventTypesManagementComponent', () => {
  let component: AdminEventTypesManagementComponent;
  let fixture: ComponentFixture<AdminEventTypesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEventTypesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventTypesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
