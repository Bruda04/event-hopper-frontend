import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteConfirmationComponent } from './invite-confirmation.component';

describe('InviteConfirmationComponent', () => {
  let component: InviteConfirmationComponent;
  let fixture: ComponentFixture<InviteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
