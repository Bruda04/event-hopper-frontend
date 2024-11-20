import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerRegisterSlide1Component } from './organizer-register-slide1.component';

describe('OrganizerRegisterSlide1Component', () => {
  let component: OrganizerRegisterSlide1Component;
  let fixture: ComponentFixture<OrganizerRegisterSlide1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizerRegisterSlide1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerRegisterSlide1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
