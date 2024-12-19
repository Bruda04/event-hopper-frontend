import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongradulationComponent } from './congradulation.component';

describe('CongradulationComponent', () => {
  let component: CongradulationComponent;
  let fixture: ComponentFixture<CongradulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongradulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongradulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
