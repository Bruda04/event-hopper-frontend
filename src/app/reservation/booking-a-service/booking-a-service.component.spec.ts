import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAServiceComponent } from './booking-a-service.component';

describe('BookingAServiceComponent', () => {
  let component: BookingAServiceComponent;
  let fixture: ComponentFixture<BookingAServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingAServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
