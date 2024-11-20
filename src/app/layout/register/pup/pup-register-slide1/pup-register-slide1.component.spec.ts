import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupRegisterSlide1Component } from './pup-register-slide1.component';

describe('PupRegisterSlide1Component', () => {
  let component: PupRegisterSlide1Component;
  let fixture: ComponentFixture<PupRegisterSlide1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupRegisterSlide1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupRegisterSlide1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
