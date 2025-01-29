import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentsManagementComponent } from './admin-comments-management.component';

describe('AdminCommentsManagementComponent', () => {
  let component: AdminCommentsManagementComponent;
  let fixture: ComponentFixture<AdminCommentsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCommentsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCommentsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
