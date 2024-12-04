import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesSuggestionsManagementComponent } from './dashboard.component';

describe('AdminCategoriesSuggestionsManagementComponent', () => {
  let component: AdminCategoriesSuggestionsManagementComponent;
  let fixture: ComponentFixture<AdminCategoriesSuggestionsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCategoriesSuggestionsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesSuggestionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
