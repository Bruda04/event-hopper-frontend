import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupRegisterSlide2Component } from './pup-register-slide2.component';

describe('PupRegisterSlide2Component', () => {
  let component: PupRegisterSlide2Component;
  let fixture: ComponentFixture<PupRegisterSlide2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupRegisterSlide2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupRegisterSlide2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
