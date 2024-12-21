import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCalendarComponent } from './profile-calendar.component';

describe('ProfileCalendarComponent', () => {
  let component: ProfileCalendarComponent;
  let fixture: ComponentFixture<ProfileCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
