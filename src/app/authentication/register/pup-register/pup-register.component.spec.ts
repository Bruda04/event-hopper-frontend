import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupRegisterComponent } from './pup-register.component';

describe('PupRegisterComponent', () => {
  let component: PupRegisterComponent;
  let fixture: ComponentFixture<PupRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
