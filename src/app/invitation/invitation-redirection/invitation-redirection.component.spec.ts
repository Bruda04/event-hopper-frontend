import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationRedirectionComponent } from './invitation-redirection.component';

describe('InvitationRedirectionComponent', () => {
  let component: InvitationRedirectionComponent;
  let fixture: ComponentFixture<InvitationRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitationRedirectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
