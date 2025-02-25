import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendComponentComponent } from './suspend-component.component';

describe('SuspendComponentComponent', () => {
  let component: SuspendComponentComponent;
  let fixture: ComponentFixture<SuspendComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspendComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
