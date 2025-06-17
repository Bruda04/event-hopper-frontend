import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStatsDialogComponent } from './event-stats-dialog.component';

describe('EventStatsDialogComponent', () => {
  let component: EventStatsDialogComponent;
  let fixture: ComponentFixture<EventStatsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventStatsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventStatsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
