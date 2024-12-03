import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuggestionsManagementComponent } from './admin-suggestions-management.component';

describe('AdminSuggestionsManagementComponent', () => {
  let component: AdminSuggestionsManagementComponent;
  let fixture: ComponentFixture<AdminSuggestionsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSuggestionsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSuggestionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
