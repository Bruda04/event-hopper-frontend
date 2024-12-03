import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSuggestionComponent } from './approve-suggestion.component';

describe('ApproveSuggestionComponent', () => {
  let component: ApproveSuggestionComponent;
  let fixture: ComponentFixture<ApproveSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveSuggestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
