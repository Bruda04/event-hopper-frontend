import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSinglePageComponent } from './event-single-page.component';

describe('EventSinglePageComponent', () => {
  let component: EventSinglePageComponent;
  let fixture: ComponentFixture<EventSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventSinglePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
