import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListManagementComponent } from './price-list-management.component';

describe('PriceListManagementComponent', () => {
  let component: PriceListManagementComponent;
  let fixture: ComponentFixture<PriceListManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceListManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
