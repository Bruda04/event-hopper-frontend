import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmationSentComponent } from './email-confirmation-sent.component';

describe('EmailConfirmationSentComponent', () => {
  let component: EmailConfirmationSentComponent;
  let fixture: ComponentFixture<EmailConfirmationSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConfirmationSentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
