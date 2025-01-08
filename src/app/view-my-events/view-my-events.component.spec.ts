import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyEventsComponent } from './view-my-events.component';

describe('ViewMyEventsComponent', () => {
  let component: ViewMyEventsComponent;
  let fixture: ComponentFixture<ViewMyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMyEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
