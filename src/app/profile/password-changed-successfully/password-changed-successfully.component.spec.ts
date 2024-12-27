import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangedSuccessfullyComponent } from './password-changed-successfully.component';

describe('PasswordChangedSuccessfullyComponent', () => {
  let component: PasswordChangedSuccessfullyComponent;
  let fixture: ComponentFixture<PasswordChangedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordChangedSuccessfullyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordChangedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
