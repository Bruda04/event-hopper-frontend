import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerRegisterSlide2Component } from './organizer-register-slide2.component';

describe('OrganizerRegisterSlide2Component', () => {
  let component: OrganizerRegisterSlide2Component;
  let fixture: ComponentFixture<OrganizerRegisterSlide2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizerRegisterSlide2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerRegisterSlide2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
