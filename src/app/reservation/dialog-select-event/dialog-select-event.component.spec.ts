import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectEventComponent } from './dialog-select-event.component';

describe('DialogSelectEventComponent', () => {
  let component: DialogSelectEventComponent;
  let fixture: ComponentFixture<DialogSelectEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSelectEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSelectEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
