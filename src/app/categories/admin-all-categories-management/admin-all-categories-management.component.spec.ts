import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllCategoriesManagementComponent } from './admin-all-categories-management.component';

describe('AdminAllCategoriesManagementComponent', () => {
  let component: AdminAllCategoriesManagementComponent;
  let fixture: ComponentFixture<AdminAllCategoriesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllCategoriesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllCategoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
