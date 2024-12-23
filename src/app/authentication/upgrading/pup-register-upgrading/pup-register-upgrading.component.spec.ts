import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupRegisterUpgradingComponent } from './pup-register-upgrading.component';

describe('PupRegisterUpgradingComponent', () => {
  let component: PupRegisterUpgradingComponent;
  let fixture: ComponentFixture<PupRegisterUpgradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupRegisterUpgradingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupRegisterUpgradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
