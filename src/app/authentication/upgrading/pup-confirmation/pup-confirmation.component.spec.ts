import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupConfirmationComponent } from './pup-confirmation.component';

describe('PupConfirmationComponent', () => {
  let component: PupConfirmationComponent;
  let fixture: ComponentFixture<PupConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
