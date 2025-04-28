import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetingPurchasedProductsComponent } from './budgeting-purchased-products.component';

describe('BudgetingPurchasedProductsComponent', () => {
  let component: BudgetingPurchasedProductsComponent;
  let fixture: ComponentFixture<BudgetingPurchasedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetingPurchasedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetingPurchasedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
